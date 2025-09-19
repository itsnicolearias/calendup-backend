import 'dotenv/config';
import { config } from './environments';

export = {
  development: {
    url: config.dbUrl
  },
  test: {
    url: "config.dbUrlT",
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};