import { ReportParser } from "../ReportParser";
import express = require('express');
import { MulterHelper } from "../Helper/MulterHelper";

export class FileHandler {

    private m_router: express.Router;
    
    public get value(): express.Router {
        return this.m_router;
    }

    constructor() {        
        this.m_router = express.Router();
        const multer= MulterHelper.CreateAndConfigureMulter();               
        this.m_router.get('/file', (req, res) => {
            this.HandleInputFile(req, res);
        });
        this.m_router.post('/file', multer.single('file'), (req, res, next) => {
            this.HandleInputFile(req, res);           
        });
    }    

    private HandleInputFile(req: any, res: any) {        
        var parser = new ReportParser(req.file.originalname);
        parser.Parse().then((value) => {
            res.send(value);
        });
    }
}