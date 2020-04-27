import { ReportParser } from "../ReportParser";
import express = require('express');
import { FileHandlerMiddleware } from "../Helper/FileHandlerMiddleware";

export class FileHandler {

    private m_router: express.Router;

    public get value(): express.Router {
        return this.m_router;
    }

    constructor() {
        this.m_router = express.Router();
        this.m_router.post('/file', FileHandlerMiddleware.Configure(), this.HandleFile.bind(this));
    }

    private async HandleFile(req: express.Request, res: express.Response,next :any) {        
        try{
            var parser = new ReportParser(req.file.originalname);   
            const result= await parser.Parse();
            res.send(result);            
        }
        catch(error)
        {
            next(error);
        } 
    }
}