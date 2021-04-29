import { Sequelize, Options } from 'sequelize';
import * as config from 'config';

type Dialect = 'mysql';
interface DbConfigOptions extends Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: Dialect;
}

export const dbConfig: DbConfigOptions = config.get('dbConfig');
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);
