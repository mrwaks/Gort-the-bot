'use strict';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export function checkInsult(client) {
    client.on('messageCreate', message => {
        if (message.author.bot) return;

        const messageInput = message.content.slice(' ').normalize('NFD').replace(/[\u0300-\u036f]/gmi, '');

        const insults = require('../data-json/insults.json').insults.split(' ');
        let insultSaid = [];

        let botMessage = '';

        for (let i in insults) {
            if (new RegExp(insults[i], 'gi').test(messageInput)) {
                insultSaid.push(messageInput.match(new RegExp(insults[i], 'gi')));
                botMessage = `${message.author.username},vous avez prononcé(e) ${insultSaid.length} injures !\nJe vous colle un avertissement !\nAu troisième avertissement vous serez banni(e) du serveur.`;
            }
        }

        if (insultSaid.length > 0) {
            message.reply(botMessage);
        } else {
            return;
        }
    })
}