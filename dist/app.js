"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// import routes
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
// import utils
const middleware_1 = __importDefault(require("./utils/middleware"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
const mongoUrl = config_1.default.MONGODB_URI || "undefined uri";
logger_1.default.info("connecting to", mongoUrl);
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    logger_1.default.info("connected to MongoDB");
})
    .catch((error) => {
    logger_1.default.error("error connecting to MongoDB:", error.message);
});
// use cors to allow requests from other origins
app.use((0, cors_1.default)());
// show frontend production build static content with 'static' middleware
app.use(express_1.default.static("dist"));
// use express json-parser
app.use(express_1.default.json());
app.get("*", (req, res) => {
    res.redirect(301, "https://thanhtoantu-portfolio.fly.dev");
});
// use weather routes
app.use("/api/weather", weatherRoutes_1.default);
// use unknown endpoint and error handler middleware
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
