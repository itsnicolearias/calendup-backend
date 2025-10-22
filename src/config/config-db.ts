import 'dotenv/config';
import { config } from './environments';

export = {
  development: {
    url: config.dbUrl
  },
  test: {
    url: config.dbUrlTest,
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