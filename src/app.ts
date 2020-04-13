import { ReportParser } from "./ReportParser"

class App {
    constructor(filePath: string) {
        let p = new ReportParser(filePath);
        p.Parse().then((value) => console.log('Is Processing Succesful: '+ value));        
    }
}
var app = new App("test");
