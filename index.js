'use strict';

const os = require('os');
require('dotenv').config();

const {
    Client,
    Intents
} = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.login(process.env.BOT_TOKEN);

const prefix = '!';

client.on('messageCreate', function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // On retire le prefix '!' dans la chaine de caractere appeler dans notre guilde discord: exemple: !sum sera egal à sum
    const commandBody = message.content.slice(prefix.length);
    // On split la chaine de caractere restante par les espaces, qui nous retourne un tableau avec le nom de la commande suivi de chaque argument: exemple: !sum 3 3 nous retournera ['sum', '3', '3'];
    const args = commandBody.split(' ');
    // On retire le nom de la commande 'sum' en tête de liste de l'array, pour la stocker dans la constante 'command'. Cela nous permet d'isoler le nom de la commande et de ne laisser que les arguments dans le tableau pour pouvoir les traiter à part.
    // On la transforme en minuscules car les commandes sur les bots discord sont generalement insensible à la casse, ce qui veut dire que si un utilisateurs tape la commande en majuscules, elle sera mis en minuscules puis donc traiter en minuscules.
    const command = args.shift().toLowerCase();

    const Discord = require('discord.js');

    // Pour calculer plusieurs sommes:
    if (command === 'sum') {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`La somme totale est de ${sum} !`);
    // Pour calculer le métabolisme de base:
    } else if (command === 'mb') {
        let sexe = args[0];
        let age = args[1]
        let size = args[2];
        let weight = args[3];

        if ((/f/i).test(sexe)) {
            const result = (9.740 * weight) + (172.9 * size) - (4.737 * age) + 667.051;
            message.reply(`Madame, votre métabolisme de base est de ${result.toFixed(0)} calories :)`);
        } else if ((/m/i).test(sexe)) {
            const result = (13.707 * weight) + (492.3 * size) - (6.673 * age) + 77.607;
            message.reply(`Monsieur, votre métabolisme de base est de ${result.toFixed(0)} calories :)`);
        }
    }
});