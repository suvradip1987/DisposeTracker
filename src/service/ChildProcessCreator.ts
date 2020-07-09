const cp = require('child_process');

export class ChildProcessCreator {
    CreateAndExecuteChildProcess(requestNumber: Number,filePath:string) {
        const childProcess = cp.fork("./dist/service/Background/ReportProcessor", [requestNumber,filePath]);
        childProcess.on('close', function (code: any) {
            //console.log('child process exited with code ' + code);
        });        
    }
}