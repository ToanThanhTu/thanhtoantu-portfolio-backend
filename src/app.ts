import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// import routes
import weatherRoutes from './routes/weatherRoutes';
import textRoutes from './routes/textRoutes';

// import utils
import middleware from './utils/middleware';
import config from './utils/config';
import logger from './utils/logger';

const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI || 'undefined uri';
logger.info('connecting to', mongoUrl);

mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    });

// use cors to allow requests from other origins
app.use(cors());

// show frontend production build static content with 'static' middleware
app.use(express.static('dist'));

// use express json-parser
app.use(express.json());

// use text routes
app.use('/api/texts', textRoutes);

// use weather routes
app.use('/api/weather', weatherRoutes);

app.get('/', (request, response) => {
    response.send('Hello World');
});

// use unknown endpoint and error handler middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

export default app;