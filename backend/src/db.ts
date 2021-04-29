import { Sequelize } from 'sequelize';
import { IConfigOptions } from './interfaces';
import * as config from 'config';

export const dbConfig: IConfigOptions = config.get('dbConfig');
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);
