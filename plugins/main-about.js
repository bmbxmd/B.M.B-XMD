const config = require('../config');
const acrcloud = require("acrcloud");
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
  pattern: 'shazam',
  alias: ['findsong'],
  react: '🔎',
  desc: 'Identify a song.',
  category: 'music',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!quoted) return reply('Please tag a song/audio for the AI to identify.');

    
    
    let buffer = await m.quoted.download();

    const acr = new acrcloud({
      host: 'identify-ap-southeast-1.acrcloud.com',
      access_key: '26afd4eec96b0f5e5ab16a7e6e05ab37',
      access_secret: 'wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8'
    });

    let { status, metadata } = await acr.identify(buffer);
    if (status.code !== 0) return reply(status.msg);

    let { title, artists, album, genres, release_date } = metadata.music[0];
    let txt = `*📑 Title:* ${title}${artists ? ` ${album.name}` : ''}${genres ? `\n*🎀 Genres:* ${genres.map(v => v.name).join(', ')}` : ''}\n`;
    txt += `*🕐 Release Date:* ${release_date}`;
    return reply(`*🔎 SUBZERO SONG IDENTIFYER 🔎*:\n\n${txt}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});
    
