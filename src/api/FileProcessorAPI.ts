import express = require('express');
import { FileHandler } from "../service/FileHandler";
import { DataAccess } from "../service/DataAccess/DataAccess";
import { ChildProcessCreator } from "../service/ChildProcessCreator";

export class FileProcessorAPI {

    private m_router: express.Router;

    public get value(): express.Router {
        return this.m_router;
    }

    constructor() {
        this.m_router = express.Router();        
        this.m_router.post('/file', FileHandler.Configure(), this.SubmitRequestInDbAndSubmitProcessRequest.bind(this));        
    }  

    private async SubmitRequestInDbAndSubmitProcessRequest(req: express.Request, res: express.Response, next: any) {
        try {            
            var filePath= './temp/' + req.file.originalname;
            var rq = new DataAccess();
            var reqNubr = await rq.SubmitRequest('suvradip@yahoo.co.in','test',filePath);  
            var childProcessCreator= new ChildProcessCreator();          
            childProcessCreator.CreateAndExecuteChildProcess(reqNubr,filePath);          
            res.send(reqNubr);
        }
        catch (error) {
            next(error);
        }
    }    
}