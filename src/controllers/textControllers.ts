import { Request, Response } from 'express';
import Text from '../models/text';

export const getAllTexts = async (request: Request, response: Response, next: any) => {
    try {
        const texts = await Text.find();
        response.json(texts);
    } catch (error) {
        next(error);
    }
};

export const createText = async (request: Request, response: Response, next: any) => {
    const { name, content } = request.body;
    const text = new Text({ name, content });

    try {
        const savedText = await text.save();
        response.status(201).json(savedText);
    } catch (error) {
        next(error);
    }
};

export const errorHandler = (error: Error, request: Request, response: Response, next: any) => {
    console.error(error.message);
    next(error);   
}