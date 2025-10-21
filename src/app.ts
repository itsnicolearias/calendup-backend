/* eslint-disable no-console */
import Database from "./libs/sequelize";
import express, { Application } from "express";
import cors from 'cors';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import { boomErrorHandler, errorHandler } from "./middlewares/error-handler";
import indexRoutes from "./routes/index.routes";
import { config } from "./config/environments";
//import "./utils/autocomplete-appointments";
//import "./utils/app-reminders";

export class App {
    public app: Application;
    public database = Database;

    constructor() {
        this.app = express();
        this.config();
        this.routes();

        this.app.use(boomErrorHandler);
        this.app.use(errorHandler);
    }

    private config() {
        /*const whiteList = [
            new RegExp(config.urlFront!)
        ];*/
        const options: cors.CorsOptions = {
            methods: ["GET", "POST", "PUT", "DELETE"],
            origin: "*",
            credentials: true,
        };
        this.app.get('/api/health', (_req, res) => res.send("ok"));
        this.app.use(morgan('dev'));
        this.app.use(cors(options));
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set('trust proxy', true);
        this.app.use(express.static('public'));
    }

    private routes() {
        this.app.use('/api', indexRoutes);
    }

    getExpressInstance() {
        return this.app;
    }

    public listen() {
        try {
            this.app.listen({ port: config.port, host: '0.0.0.0' }, () => {
                console.log(`Server running on port ${config.port}`);
            });
        } catch (err) {
            console.error('Connection error:', err);
        }
    }
}
