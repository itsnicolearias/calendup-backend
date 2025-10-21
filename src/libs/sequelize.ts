import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/environments';
import { Models } from '../models';
import pg from "pg"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: any = {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    application_name: 'CalendUp',
    schema: 'public',
  },
  logging: config.isProd ? false : true,
  models: Models(),
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

//const dbEnv: any = config.env;

const Database = new Sequelize(String(config.dbUrl), options);

export default Database;
