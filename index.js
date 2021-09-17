'use strict';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

// Plugins list:
import { calculSum } from './plugins-bot/calcul-sum.js';
import { calculMB } from './plugins-bot/calcul_mb.js';
import { checkInsult } from './plugins-bot/checkInsult.js';
/*_____________________________________________________________*/

const {
    Client,
    Intents
} = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.login(process.env.BOT_TOKEN);

const prefix = '!';

//// PLUGINS:

calculSum(client, prefix);
calculMB(client, prefix);
checkInsult(client);