"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
// getting the api key from the .env file (devlopment) or Secrets (production)
const apiKey = process.env.WEATHER_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
const getWeather = async (request, response, next) => {
    // for dynamic location
    // const { lat, lon } = request.body as { lat: String, lon: String };
    // Sydney lat and lon
    const lat = "-33.8698439";
    const lon = "151.2082848";
    const url = `${baseUrl}&lat=${lat}&lon=${lon}`;
    try {
        const axiosResponse = await axios_1.default.get(url);
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
    }
    catch (error) {
        response.status(500).json({ error: 'Error fetching the weather data' });
    }
};
exports.getWeather = getWeather;
