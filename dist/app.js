"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportParser_1 = require("./ReportParser");
class App {
    constructor(filePath) {
        let p = new ReportParser_1.ReportParser(filePath);
        p.Parse().then((value) => console.log(value));
    }
}
var app = new App("test");
