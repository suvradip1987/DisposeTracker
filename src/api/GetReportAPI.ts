import express = require('express');
import { DataAccess } from "../service/DataAccess/DataAccess";

export class GetReportAPI {

    private m_router: express.Router;

    public get value(): express.Router {
        return this.m_router;
    }

    constructor() {
        this.m_router = express.Router();        
        this.m_router.get('/getReport',this.GetProcessedInfo.bind(this));        
    }  

    private async GetProcessedInfo(req: express.Request, res: express.Response, next: any)
    {
        try {   
            var reqNumber= Number(req.query.reqNumber); 
            console.log(reqNumber);                   
            var dataAccess = new DataAccess();
            var parsedReport = await dataAccess.GetParsedReport(reqNumber);         
            res.send(parsedReport);
        }
        catch (error) {
            next(error);
        }        
    }    
}