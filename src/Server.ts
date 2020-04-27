import express = require('express');
import { Router } from './Router';
const cors = require('cors');

class Server {

    m_app: express.Application;

    constructor() {
        this.m_app = express();
        this.InitializeMiddleware();
    }    

    private InitializeMiddleware() {
        this.m_app.use(cors());
        this.InitializeRouter();
        this.InitializeErrorHandlingMiddleware();
    }

    private InitializeErrorHandlingMiddleware() {
        this.m_app.use(function (err: any, req: any, res: any, next: express.NextFunction) {
            console.error(err.stack);            
            res.status(400).send({"error":err.message});
        });
    }

    private InitializeRouter() {
        var router = new Router(this.m_app);
        router.Load();
    }

    public StartServer() {
        const port = process.env.PORT || 8080;
        this.m_app.listen(port, () => {
            console.log('Server is up on Port '+port);
        })
    }
}

var server = new Server();
server.StartServer();

