import Database from "./libs/sequelize";
import express, { Application } from "express";
import cors from 'cors';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import { boomErrorHandler, errorHandler } from "./middlewares/error-handler";
import indexRoutes from "./routes/index.routes";
import { config } from "./config/environments";
import "./utils/autocomplete-appointments";
import "./utils/app-reminders"
    
export class App {
    app: Application
    
    public database = Database
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    public async config() {
    
        const whiteList: any[] = [
           new RegExp(config.urlFront!), // convierte el string en RegExp
          //.localhost:3000$/
        ];
        const options: cors.CorsOptions = {
          methods: ["GET", "POST", "PUT", "DELETE"],
          origin: "*",
          credentials: true,
        };
        this.app.use(morgan('dev'))
        this.app.use(cors(options));
        this.app.use(express.json()); 
     
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set('trust proxy', true);
        this.app.use(express.static('public'));

      }

    routes(): void {
        this.app.use('/api', indexRoutes);
      }

    async listen() {
        this.app.use(boomErrorHandler);
        this.app.use(errorHandler);

       this.app.listen({ port: config.port, host: '0.0.0.0' }, () => {
        console.log(`Server running on port ${config.port}`);
      });
       await this.database.authenticate().then(() => console.log('DB connected'));
    }
}



