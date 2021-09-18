'use strict';

import axios from 'axios';

export function getWeather(client, prefix) {
    const date = new Date();
    const hours = date.getHours();
    const timeDay = {
        hello1: hours < 18 && hours > 6 ? `Bonjour` : 'Bonsoir',
        hello2: hours < 18 && hours > 6 ? `Bonne journée !` : 'Bonne soirée !',
    }
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
                    const temp = parseFloat(response.data.main.temp).toFixed(0);
                    const tempMin = parseFloat(response.data.main.temp_min).toFixed(0);
                    const tempMax = parseFloat(response.data.main.temp_max).toFixed(0);
                    const feelsLike = parseInt(response.data.main.feels_like);
                    const mainWeather = () => {
                        if ((/clear sky/i).test(response.data.weather[0].description)) {
                            return 'ensoleillé 🌞';
                        } else if ((/few clouds/i).test(response.data.weather[0].description)) {
                            return 'peu nuageux ⛅'
                        } else if ((/scattered clouds/i).test(response.data.weather[0].description) || (/broken clouds/i).test(response.data.weather[0].description)) {
                            return 'nuageux ☁️';
                        } else if ((/rain/i).test(response.data.weather[0].main)) {
                            return 'pluvieux 🌧️';
                        } else if ((/snow/i).test(response.data.weather[0].description)) {
                            return 'enneigé ❄️';
                        }
                    }
                    let botMessage = `${timeDay.hello1} ${username} !\nLa température sur ${city} est de ${temp}°C\nLe temps est ${mainWeather()}\nLa température ressentie est de ${feelsLike}°C\nTempérature minimale: ${tempMin}°C\nTempérature maximale: ${tempMax}°C\n${timeDay.hello2}`;
                    message.reply(botMessage);
                })
                .catch(error => console.log(error));
        }
    })
}