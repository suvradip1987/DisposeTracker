import * as express from 'express';
import { FileHandler } from './controllers/FileHandler';

export class Router {

    m_app:express.Application;    

    constructor(app :express.Application) {
        this.m_app=app;        
    }

    Load() : void
    {        
        this.AddFileRouter();
    }          


    private AddFileRouter() {
        var filehandler = new FileHandler();
        this.m_app.use('/File', filehandler.value);
    }
}