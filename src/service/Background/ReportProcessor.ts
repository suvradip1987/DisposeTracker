import { ReportGenerator } from "./ReportGenerator";
import { DataAccess } from "../DataAccess/DataAccess";
import { ResultReport } from "./ResultReport";

export class ReportProcessor {
    m_filePath: string;
    m_ReqNumber: number;

    constructor(path: string, requestNbr: number) {
        this.m_filePath = path;
        this.m_ReqNumber = requestNbr;
    }

    async CreateAndSaveReport() {
        try {
            let parsedReport = await this.GenerateReport();
            await this.SaveReportToDB(parsedReport);                                    
        }
        catch (error) {
            console.log(error);
        }
    }    

    private async GenerateReport() {
        try {
            var reportGenerator = new ReportGenerator(this.m_filePath);
            const result = await reportGenerator.GenerateReport();
            return new ResultReport(true,result);           
        }
        catch (error) {   
            console.log(error);                     
            return new ResultReport(false,"Processing failed while generating report");
        }
    }

    private async SaveReportToDB(result: ResultReport) {
        try {
            var dataAccess = new DataAccess();
            var reqNubr = await dataAccess.SaveReport(this.m_ReqNumber , result);  
        }
        catch(error)
        {
            return "Saving Failed to DB";            
        }
    }
}

var requestNbr = Number(process.argv[2]);
var filePath = process.argv[3];
var reportProcessor = new ReportProcessor(filePath, requestNbr);
reportProcessor.CreateAndSaveReport();