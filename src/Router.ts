import * as express from 'express';
import { FileHandler } from './api/FileHandler';

export class Router {

    m_app: express.Application;

    constructor(app: express.Application) {
        this.m_app = app;
    }

    Load(): void {
        var filehandler = new FileHandler();
        this.AddRouter(filehandler);
    }

    private AddRouter(filehandler: FileHandler) {
        this.m_app.use('/api', filehandler.value);
    }
}