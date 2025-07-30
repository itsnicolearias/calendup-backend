import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./config/environments";

export class App {
    app: Application
    constructor(){
        this.app = express()
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }

    async listen() {
       await this.app.listen(config.port);
       console.log('server running')
  
    }
}