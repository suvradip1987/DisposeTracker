export class ResultReport
{
    private m_parsedReport: string;
    private m_isSuccessful : boolean;

    constructor(isSuccessful: boolean,parsedReport: string)
    {
        this.m_isSuccessful = isSuccessful;
        this.m_parsedReport = parsedReport; 
    }
    
    public get ParsedReport() : string {
        return this.m_parsedReport;
    }

    public get IsSuccessful() : boolean {
        return this.m_isSuccessful;
    }    

}