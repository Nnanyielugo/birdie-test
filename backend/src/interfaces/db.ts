import { Options } from 'sequelize';

type Dialect = 'mysql';

export interface IConfigOptions extends Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: Dialect;
}
