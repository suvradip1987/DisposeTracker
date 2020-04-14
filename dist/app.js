"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportParser_1 = require("./ReportParser");
const express = require("express");
console.log(__dirname);
console.log(__filename);
//var app = new App("test");
const app = express();
app.get('', (req, res) => {
    var parser = new ReportParser_1.ReportParser('');
    parser.Parse().then((value) => {
        res.send(value);
    });
    console.log('request handled');
});
app.listen('3000', () => {
    console.log('Server is up on Port 3000');
});
