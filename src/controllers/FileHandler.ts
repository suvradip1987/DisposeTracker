import { ReportParser } from "../ReportParser";
import express = require('express');

export class FileHandler {

    private m_router: express.Router;
    public get value(): express.Router {
        return this.m_router;
    }    

    constructor() {
        this.m_router = express.Router();
        this.m_router.get('', (req, res) => {
            this.HandleInputFile(req, res);
        });
    }

    private HandleInputFile(req: any, res: any) {        
        var parser = new ReportParser('');
        parser.Parse().then((value) => {
            res.send(value);
        });
    }
}