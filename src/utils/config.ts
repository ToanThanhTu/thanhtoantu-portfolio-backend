import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'undefined url';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export default { MONGODB_URI, PORT, WEATHER_API_KEY };