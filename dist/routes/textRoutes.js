"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const textControllers_1 = require("../controllers/textControllers");
const textRouter = (0, express_1.Router)();
textRouter.get('/', textControllers_1.getAllTexts);
textRouter.post('/', textControllers_1.createText);
exports.default = textRouter;
