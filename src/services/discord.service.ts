import { Client, GatewayIntentBits, Message, TextChannel } from 'discord.js';
import { processLearnedFact } from './groq.service';
import prisma from '../lib/prisma';

let client: Client | null = null;

export const initializeDiscordBot = () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  
  if (!token) {
    console.warn('[Discord API] ⚠️ DISCORD_BOT_TOKEN is missing. Bot will not start.');
    return;
  }

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once('ready', () => {
    console.log(`[Discord API] 🤖 Logged in as ${client?.user?.tag}`);
  });

  client.on('messageCreate', async (message: Message) => {
    // Ignore messages from bots (including ourselves)
    if (message.author.bot) return;

    if (message.content.startsWith('!learn ')) {
      const rawText = message.content.replace('!learn ', '').trim();
      
      if (!rawText) return;

      try {
        console.log(`[Discord API] 🧠 Processing learning command from ${message.author.username}...`);
        
        // 1. Process with AI to clean it up
        const extractedFact = await processLearnedFact(rawText);

        // 2. Save to database
        await prisma.learnedFact.create({
          data: {
            rawInput: rawText,
            fact: extractedFact,
          },
        });

        // 3. Reply to confirm
        await message.reply(`✅ **Successfully Learned New Fact!**\n\n**Raw Input:** ${rawText}\n**Cleaned Fact added to AI Context:** ${extractedFact}`);
        console.log(`[Discord API] ✅ Learned new fact: ${extractedFact}`);
      } catch (error) {
        console.error('[Discord API] ❌ Error processing learning command:', error);
        await message.reply(`❌ Failed to learn fact. See server logs for details.`);
      }
    }
  });

  client.login(token).catch(err => {
    console.error('[Discord API] ❌ Failed to login:', err.message);
  });
};

export const notifyAIInteraction = async (userPrompt: string, aiResponse: string) => {
  if (!client || !client.isReady()) return;

  const channelId = process.env.DISCORD_LEARNING_CHANNEL_ID;
  if (!channelId) return;

  try {
    const channel = await client.channels.fetch(channelId) as TextChannel;
    if (channel && channel.isTextBased()) {
      // Truncate if too long for a single discord message (limit is 2000 chars)
      const truncatedPrompt = userPrompt.length > 500 ? userPrompt.substring(0, 500) + '...' : userPrompt;
      const truncatedResponse = aiResponse.length > 1000 ? aiResponse.substring(0, 1000) + '...' : aiResponse;
      
      const msg = `**👤 User:** ${truncatedPrompt}\n\n**🤖 AI:** ${truncatedResponse}\n\n*Reply with \`!learn <fact>\` to teach me something based on this!*`;
      await channel.send(msg);
    }
  } catch (error) {
    console.error('[Discord API] ❌ Failed to send interaction to channel:', error);
  }
};
