// to use .env environment variables file
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';

import weatherRoutes from './routes/weatherRoutes';
import textRoutes from './routes/textRoutes';
import { errorHandler } from './controllers/textControllers';

const app = express();

// use cors to allow requests from other origins
app.use(cors());

// show frontend production build static content with 'static' middleware
app.use(express.static('dist'));

// use express json-parser
app.use(express.json());

// use text routes
app.use('/api', textRoutes);

// use weather routes
app.use('/api/weather', weatherRoutes);

app.get('/', (request, response) => {
    response.send('Hello World');
});

const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

// use unknown endpoint and error handler middleware
app.use(unknownEndpoint);
app.use(errorHandler);

// set and use PORT 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});