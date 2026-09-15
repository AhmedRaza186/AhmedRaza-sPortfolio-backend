import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initializeDiscordBot } from './services/discord.service';

const PORT = process.env.PORT || 8000;

// Start Discord Bot
initializeDiscordBot();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
