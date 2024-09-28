"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createText = exports.getAllTexts = void 0;
const text_1 = __importDefault(require("../models/text"));
const getAllTexts = async (request, response, next) => {
    try {
        const texts = await text_1.default.find();
        response.json(texts);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTexts = getAllTexts;
const createText = async (request, response, next) => {
    const { name, content } = request.body;
    const text = new text_1.default({ name, content });
    try {
        const savedText = await text.save();
        response.status(201).json(savedText);
    }
    catch (error) {
        next(error);
    }
};
exports.createText = createText;
