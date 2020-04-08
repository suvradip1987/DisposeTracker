import { ReportParser } from "./ReportParser"

class App {
    constructor(filePath: string) {
        let p = new ReportParser(filePath);
        let isSuccessul = p.Parse();
    }
}
var app = new App("test");
