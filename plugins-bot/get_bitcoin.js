'use strict';

import axios from 'axios';

// Faire correspondre la demande args de monnaie dans ce tableau pour la reponse (response.data.EUR ou response.data.USD etc...) rajoutez toutes les monnaies possibles.
let money = ['EUR', 'USD'];

export function getBitcoin(client, prefix) {
    axios.get('https://www.blockchain.com/ticker')
    .then(response => {
        client.on('messageCreate', message => {
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;

            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(' ');
            const command = args.shift().toLowerCase();

            if ((/bitcoin/gi).test(command)) {
                if ((/eur/gi).test(args[0])) {
                    if ((/last/gi).test(args[1])) {
                        console.log(`Le dernier cours du Bitcoin en Euros est de ${response.data.EUR.last}€`);
                        message.reply(`Le dernier cours du Bitcoin en Euros est de ${response.data.EUR.last}€`);
                    }
                }
            }
        })
    })
    .catch(error => console.log(error));
}