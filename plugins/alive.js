import { BOT_INFO } from '../config.js';
import { aliveMessage, setAliveMsg } from '../lib/alive.js';
import { bot } from '../lib/plugins.js';

bot(
	{
		pattern: 'alive',
		desc: 'Is Bot Alive?',
		type: 'user',
	},
	async (message, match) => {
		if (match) {
			await setAliveMsg(match);
			return message.sendReply('_Alive Updated_');
		}
		const msg = await aliveMessage(message);
		const botInfo = BOT_INFO.split(';')[2];

		const mentionData = {
			mentions: [message.participant],
			contextInfo: {
				mentionedJid: [message.participant],
			},
		};

		return botInfo ? message.send(botInfo, { ...mentionData, caption: msg }) : message.sendReply(msg, mentionData);
	},
);