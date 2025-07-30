import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./config/environments";
import Database from "./libs/sequelize";

export class App {
    app: Application
    public database = Database
    
    constructor(){
        this.app = express()
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }

    
    async listen() {
       await this.app.listen(config.port);
       console.log('server running')
       try {
        await this.database.authenticate(); // Check the connection to database
        console.log('DB connected');
       } catch (e) {
        console.error('Database connection error:', e);
       }
  
    }
}