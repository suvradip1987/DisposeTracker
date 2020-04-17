import express = require('express');
import { Router } from './Router';
const cors= require('cors');

const app: express.Application = express();

app.use(cors());

var router = new Router(app);
router.Load();

app.listen('3000', () => {
    console.log('Server is up on Port 3000');
})
