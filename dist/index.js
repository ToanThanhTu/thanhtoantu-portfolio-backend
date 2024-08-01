"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// to use .env environment variables file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const textRoutes_1 = __importDefault(require("./routes/textRoutes"));
const textControllers_1 = require("./controllers/textControllers");
const app = (0, express_1.default)();
// use cors to allow requests from other origins
app.use((0, cors_1.default)());
// show frontend production build static content with 'static' middleware
app.use(express_1.default.static('dist'));
// use express json-parser
app.use(express_1.default.json());
// use text routes
app.use('/api', textRoutes_1.default);
// use weather routes
app.use('/api/weather', weatherRoutes_1.default);
app.get('/', (request, response) => {
    response.send('Hello World');
});
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
// use unknown endpoint and error handler middleware
app.use(unknownEndpoint);
app.use(textControllers_1.errorHandler);
// set and use PORT 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
