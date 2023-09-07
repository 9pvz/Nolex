const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

const prefix = '!';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setStatus('idle'); 
  client.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(`${prefix}ping`)) {
    message.reply('Pong!');
  } else if (message.content.startsWith(`${prefix}hello`)) {
    message.channel.send('Hello!');
  }
});

client.on('ready', async () => {
  setTimeout(async () => {
    const channel = await client.channels.fetch('1134126710414127125');
    if (channel.type === 'GUILD_VOICE') {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      console.log('تم الانضمام إلى الروم الصوتي!');
      setTimeout(() => {
        connection.destroy();
        console.log('تم الخروج من الروم الصوتي!');
      }, 86400000); 
    }
  }, 5000); 
});


client.login(process.env.token)
