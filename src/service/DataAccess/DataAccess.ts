import { Config } from "../../config/Config";
import { ResultReport } from "../Background/ResultReport";
import { MAX } from "mssql";
const sql = require('mssql/msnodesqlv8');


export class DataAccess {

    async SubmitRequest(visitorId: string, description: string, filePath: string): Promise<Number> {
        try {
            var pool = await new sql.ConnectionPool(Config.testConfig());
            await pool.connect();

            let result = await pool.request()
                .input('VisitorId', sql.NVarChar(100), visitorId)
                .input('Description', sql.NVarChar(200), description)
                .input('Status', sql.NVarChar(20), 'Submitted')
                .input('FilePath', sql.NVarChar(100), filePath)
                .output('ReqId', sql.int)
                .execute('spCreateRequest');
            var reqid = result.output.ReqId;
            return reqid;
        } catch (err) {
            console.log(err);
            throw new Error('Job Submission Failed');
        }
        finally {
            pool.close();
        }
    }

    async SaveReport(requestNumber: Number, resultReport: ResultReport): Promise<void> {
        try {
            var pool = await new sql.ConnectionPool(Config.testConfig());
            await pool.connect();
            let result = await pool.request()
                .input('ReqId', sql.Int, requestNumber)
                .input('CallStackData', sql.NVarChar(MAX), resultReport.ParsedReport)
                .input('IsSuccessful', sql.Bit, resultReport.IsSuccessful)
                .execute('spSaveReport');
        } catch (err) {
            console.log(err);
            throw new Error('Saving Report Failed');
        }
        finally {
            pool.close();
        }
    }

    async GetParsedReport(requestNumber: Number): Promise<string> {
        try {
            var pool = await new sql.ConnectionPool(Config.testConfig());
            await pool.connect();
            let result = await pool.request()
                .input('ReqId', sql.Int, requestNumber)
                .execute('spGetParsedReport');
            var records = result.recordset;
            if (records.length != 0) {
                if (typeof (records[0].CallStackData) !== undefined)
                    return result.recordset[0].CallStackData;
            }
            return "";
        }
        catch (err) {
            console.log(err);
            throw new Error('Retrieving Report Failed');
        }
        finally {
            pool.close();
        }
    }

    async GetUserReports(userId: string): Promise<string> {
        try {
            var pool = await new sql.ConnectionPool(Config.testConfig());
            await pool.connect();
            let result = await pool.request()
                .input('UserId', sql.NVarChar(100), userId)
                .execute('spGetUserJobs');
            var records = result.recordset;
            if (records.length != 0) {
                return result.recordset;
            }
            return "";
        }
        catch (err) {
            console.log(err);
            throw new Error('Retrieving Jobs Failed');
        }
        finally {
            pool.close();
        }
    }
}