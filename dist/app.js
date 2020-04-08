"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportParser_1 = require("./ReportParser");
class App {
    constructor(filePath) {
        let p = new ReportParser_1.ReportParser(filePath);
        let isSuccessul = p.Parse();
    }
}
var app = new App("test");
