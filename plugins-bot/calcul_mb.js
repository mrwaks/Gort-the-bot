'use strict';

export function calculMB(client, prefix) {
    client.on('messageCreate', message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        if (command === 'mb') {
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
    })
}