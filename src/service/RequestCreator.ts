import { Config } from "../config/Config";
const sql = require('mssql/msnodesqlv8');

export class RequestCreator {
    //m_visitorId: string; 
    //m_ReqDescription: string;
    //m_filePath: string;

    //constructor(name:string,description:string,filePath:string) {
    //    this.m_visitorId = name;
    //    this.m_ReqDescription = description;
    //    this.m_filePath = filePath;
    //}

    async SubmitRequest(): Promise<Number> {

        try {
            var pool  = await new sql.ConnectionPool(Config.testConfig());
            await pool.connect();

            let result2 = await pool.request()
                .input('VisitorId', sql.NVarChar(100), 'suvradip@yahoo.co.in')
                .input('Description', sql.NVarChar(200), 'Node Test')
                .input('Status', sql.NVarChar(20), 'Submitted')
                .input('FilePath', sql.NVarChar(100), 'C:\Temp\Files\File.log')
                .output('ReqId', sql.int)
                .execute('spCreateNewRequest');
            console.log(result2.output.ReqId);
            pool.close();
            return 1;
        } catch (err) {
            console.log(err);
            return 0;
        }

    }

}