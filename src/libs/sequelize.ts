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
      require: true,
    },
  };
}

const url = config.env === "test" ? config.dbUrlTest : config.dbUrl;

const Database = new Sequelize(String(url), options);

export default Database;
