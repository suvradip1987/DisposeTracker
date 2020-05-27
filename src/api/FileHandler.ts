import { ReportParser } from "../service/ReportParser";
import express = require('express');
import { FileHandlerMiddleware } from "../Helper/FileHandlerMiddleware";
import { RequestCreator } from "../service/RequestCreator";


export class FileHandler {

    private m_router: express.Router;

    public get value(): express.Router {
        return this.m_router;
    }

    constructor() {
        this.m_router = express.Router();
        this.m_router.post('/file', FileHandlerMiddleware.Configure(), this.HandleFile.bind(this));
        this.m_router.post('/file1', this.TestDb.bind(this));
    }

    private async HandleFile(req: express.Request, res: express.Response,next :any) {        
        try {

            var parser = new ReportParser(req.file.originalname);
            const result= await parser.Parse();
            res.send((result) as any);            
        }
        catch(error)
        {
            next(error);
        } 
    }

    private async TestDb(next:any) {
        try {

            var rq = new RequestCreator();
            rq.SubmitRequest();
        }
        catch (error) {
            next('error');
        } 
    }
}