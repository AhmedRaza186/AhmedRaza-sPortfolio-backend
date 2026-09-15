import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { generateAIResponse } from '../services/groq.service';

export const handleChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId, message } = req.body;

    console.log(`\n[Chat API] Received new chat request`);

    if (!message || typeof message !== 'string') {
      console.warn(`[Chat API] Invalid message format`);
      res.status(400).json({ success: false, error: 'Message must be a non-empty string' });
      return;
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      res.status(400).json({ success: false, error: 'Message cannot be empty' });
      return;
    }

    if (trimmedMessage.length > 2000) {
      console.warn(`[Chat API] Message exceeded length limit`);
      res.status(400).json({ success: false, error: 'Message exceeds maximum length of 2000 characters' });
      return;
    }

    let currentSessionId = sessionId;
    console.log(`[Chat API] User prompt: "${trimmedMessage.substring(0, 50)}${trimmedMessage.length > 50 ? '...' : ''}"`);

    // Validate sessionId if provided
    if (currentSessionId) {
      const existingSession = await prisma.chatSession.findUnique({
        where: { id: currentSessionId },
      });
      if (!existingSession) {
        res.status(404).json({ success: false, error: 'Chat session not found' });
        return;
      }
    } else if (!currentSessionId) {
    // If no session ID provided, create a new session
      const newSession = await prisma.chatSession.create({
        data: {},
      });
      currentSessionId = newSession.id;
      console.log(`[Chat API] Created new session: ${currentSessionId}`);
    } else {
      console.log(`[Chat API] Using existing session: ${currentSessionId}`);
    }

    // Save user message to database
    const userMessageRecord = await prisma.chatMessage.create({
      data: {
        sessionId: currentSessionId,
        role: 'user',
        content: trimmedMessage,
      },
    });

    // Retrieve recent history (last 10 messages, excluding the one we just saved)
    const recentMessages = await prisma.chatMessage.findMany({
      where: { sessionId: currentSessionId, id: { not: userMessageRecord.id } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    
    // Reverse to chronological order
    const history = recentMessages.reverse().map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    console.log(`[Chat API] Querying Groq AI with ${history.length} previous messages...`);
    
    // Call Groq
    const aiResponseContent = await generateAIResponse(history, trimmedMessage);
    
    console.log(`[Chat API] AI response generated successfully!`);

    // Save AI response to database
    const aiMessage = await prisma.chatMessage.create({
      data: {
        sessionId: currentSessionId,
        role: 'assistant',
        content: aiResponseContent,
      },
    });

    // Update the session's updatedAt timestamp
    await prisma.chatSession.update({
      where: { id: currentSessionId },
      data: { updatedAt: new Date() },
    });

    res.status(200).json({
      success: true,
      sessionId: currentSessionId,
      message: aiMessage.content,
    });
  } catch (error: any) {
    console.error('\n[Chat API] ERROR during chat processing:');
    console.error(`[Chat API] Message: ${error.message}`);
    console.error(error);
    next(error);
  }
};
