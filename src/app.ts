import * as path from 'path';
import { ReportParser } from "./ReportParser";
import express = require('express');

console.log(__dirname);
console.log(__filename);

//var app = new App("test");
const app: express.Application = express();

app.get('', (req, res) => {
    var parser = new ReportParser('');
    parser.Parse().then((value) => {
        res.send(value);
    }
    );    
});

app.listen('3000', () => {
    console.log('Server is up on Port 3000');
})
