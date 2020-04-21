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
        this.m_router.post('/file', FileHandlerMiddleware.Configure(), (req, res,next) => {
            this.HandleInputFile(req, res,next);
        });
    }

    private HandleInputFile(req: any, res: any,next :any) {
        var parser = new ReportParser(req.file.originalname);
        parser.Parse().then((value) => {
            res.send(value);
        })
    }
}