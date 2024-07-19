import { Router } from "express";
import { getWeather } from "../controllers/weatherController";

const weatherRouter = Router();

weatherRouter.get('/', getWeather);

export default weatherRouter;