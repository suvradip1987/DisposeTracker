"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportParser_1 = require("../ReportParser");
const express = require("express");
class FileHandler {
    constructor() {
        this.m_router = express.Router();
        this.m_router.get('', (req, res) => {
            this.HandleInputFile(req, res);
        });
    }
    get value() {
        return this.m_router;
    }
    HandleInputFile(req, res) {
        var parser = new ReportParser_1.ReportParser('');
        parser.Parse().then((value) => {
            res.send(value);
        });
    }
}
exports.FileHandler = FileHandler;
