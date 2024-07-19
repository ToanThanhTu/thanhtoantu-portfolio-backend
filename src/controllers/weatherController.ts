import axios from 'axios';
import { Request, Response } from 'express';

const apiKey = process.env.WEATHER_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

export const getWeather = async (request: Request, response: Response, next: any) => {
    const { lat, lon } = request.body as { lat: String, lon: String };
    // const url = `${baseUrl}&lat=${lat}&lon=${lon}`;
    const url = `${baseUrl}&lat=-33.8698439&lon=151.2082848`;

    try {
        const axiosResponse = await axios.get(url);
        const weatherData = axiosResponse.data;
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