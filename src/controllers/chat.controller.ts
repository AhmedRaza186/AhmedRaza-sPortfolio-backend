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

    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, error: 'Message must be a non-empty string' });
      return;
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      res.status(400).json({ success: false, error: 'Message cannot be empty' });
      return;
    }

    if (trimmedMessage.length > 2000) {
      res.status(400).json({ success: false, error: 'Message exceeds maximum length of 2000 characters' });
      return;
    }

    let currentSessionId = sessionId;

    // Validate sessionId if provided
    if (currentSessionId) {
      const existingSession = await prisma.chatSession.findUnique({
        where: { id: currentSessionId },
      });
      if (!existingSession) {
        res.status(404).json({ success: false, error: 'Chat session not found' });
        return;
      }
    } else {
      // If no session ID provided, create a new session
      const newSession = await prisma.chatSession.create({
        data: {},
      });
      currentSessionId = newSession.id;
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

    // Call Groq
    const aiResponseContent = await generateAIResponse(history, trimmedMessage);

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
  } catch (error) {
    next(error);
  }
};
