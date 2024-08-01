"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherController_1 = require("../controllers/weatherController");
const weatherRouter = (0, express_1.Router)();
weatherRouter.get('/', weatherController_1.getWeather);
exports.default = weatherRouter;
