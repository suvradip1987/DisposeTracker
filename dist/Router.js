"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileHandler_1 = require("./controllers/FileHandler");
class Router {
    constructor(app) {
        this.m_app = app;
    }
    Load() {
        this.AddFileRouter();
    }
    AddFileRouter() {
        var filehandler = new FileHandler_1.FileHandler();
        this.m_app.use('/File', filehandler.value);
    }
}
exports.Router = Router;
