'use strict';

import axios from 'axios';
import {
    createRequire
} from 'module';
const require = createRequire(
    import.meta.url);
const dataWeather = require('../data-json/weather_description.json');
let weather = [dataWeather.description];
weather = weather[0];

export function getWeather(client, prefix) {
    client.on('messageCreate', message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        const username = message.author.username;

        if ((/meteo/gi).test(command)) {
            const city = args[0];
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

            axios.get(url)
                .then(response => {
                    const date = new Date();
                    const hours = date.getHours();
                    const timeDay = {
                        hello1: hours < 18 && hours > 6 ? `Bonjour` : 'Bonsoir',
                        hello2: hours < 18 && hours > 6 ? `Bonne journée !` : 'Bonne soirée !',
                    }
                    const temp = parseFloat(response.data.main.temp).toFixed(0);
                    const tempMin = parseFloat(response.data.main.temp_min).toFixed(0);
                    const tempMax = parseFloat(response.data.main.temp_max).toFixed(0);
                    const feelsLike = parseInt(response.data.main.feels_like);
                    const describeWeather = () => {
                        for (let i in weather) {
                            if (response.data.weather[0].description === weather[i][0]) {
                                return weather[i][1];
                            }
                        }
                    }
                    let botMessage = `${timeDay.hello1} ${username} !\nLa température sur ${city} est de ${temp}°C\n${describeWeather()}\nLa température ressentie est de ${feelsLike}°C\nTempérature minimale: ${tempMin}°C\nTempérature maximale: ${tempMax}°C\n${timeDay.hello2}`;
                    message.reply(botMessage);
                })
                .catch(error => console.log(error));
        }
    })
}