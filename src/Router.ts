import * as express from 'express';
import { FileProcessorAPI } from './api/FileProcessorAPI';
import { GetReportAPI } from './api/GetReportAPI';
import { GetUserReportsAPI } from './api/GetUserReportsAPI';

export class Router {

    m_app: express.Application;

    constructor(app: express.Application) {
        this.m_app = app;     
    }

    Load(): void {
        var fileProcessor = new FileProcessorAPI();
        this.AddRouter(fileProcessor);
        var getReport = new GetReportAPI();
        this.AddRouter(getReport);
        var getUserReports = new GetUserReportsAPI();
        this.AddRouter(getUserReports);
    }

    private AddRouter(router: any) {
        this.m_app.use('/api', router.value);
    }
}