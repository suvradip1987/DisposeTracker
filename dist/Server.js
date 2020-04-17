"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Router_1 = require("./Router");
const cors = require('cors');
const app = express();
app.use(cors());
var router = new Router_1.Router(app);
router.Load();
app.listen('3000', () => {
    console.log('Server is up on Port 3000');
});
