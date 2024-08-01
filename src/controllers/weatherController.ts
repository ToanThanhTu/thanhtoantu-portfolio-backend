import axios from 'axios';
import { Request, Response } from 'express';

import config from '../utils/config';

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${config.WEATHER_API_KEY}&units=metric`;

export const getWeather = async (request: Request, response: Response, next: any) => {
    // for dynamic location
    // const { lat, lon } = request.body as { lat: String, lon: String };

    // Sydney lat and lon
    const lat = "-33.8698439";
    const lon = "151.2082848";
    const url = `${baseUrl}&lat=${lat}&lon=${lon}`;

    try {
        const axiosResponse = await axios.get(url);
        const weatherData = axiosResponse.data;

        // extract some necessary weather data for display
        const responseWeatherData = {
            name: weatherData.name,
            temp: `${weatherData.main.temp}°C`,
            description: weatherData.weather[0].main,
            humidity: `${weatherData.main.humidity}%`,
            wind: `${weatherData.wind.speed} m/s`,
            imgUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        };
        response.json(responseWeatherData);
    } catch (error) {
        response.status(500).json({ error: 'Error fetching the weather data' });
    }
}