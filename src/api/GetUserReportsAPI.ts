import express = require('express');
import { DataAccess } from "../service/DataAccess/DataAccess";

export class GetUserReportsAPI {

    private m_router: express.Router;

    public get value(): express.Router {
        return this.m_router;
    }    

    constructor() {
        this.m_router = express.Router();        
        this.m_router.get('/getUserReports',this.GetUserReports.bind(this));        
    }  

    private async GetUserReports(req: express.Request, res: express.Response, next: any)
    {
        try {                                                      
            var dataAccess = new DataAccess();
            var userReports = await dataAccess.GetUserReports(req.body.user);                   
            res.send(userReports);
        }
        catch (error) {
            next(error);
        }        
    }    
}