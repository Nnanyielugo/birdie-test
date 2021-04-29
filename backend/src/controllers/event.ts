import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import * as mysql from 'mysql2';

interface DbConfigOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  // dialect: Dialect;
}

export async function findAll(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const dbConfig: DbConfigOptions = config.get('dbConfig');
  let limit = 50;
  let skip = 0;

  if (typeof req.query.limit === 'string') {
    limit = parseInt(req.query.limit);
  }

  if (typeof req.query.skip === 'string') {
    skip = parseInt(req.query.skip);
  }

  const con = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log('Connected To The Database!');
    // Select Data
    var sql = `SELECT id, event_type, visit_id, timestamp, caregiver_id, care_recipient_id FROM events LIMIT ${limit} OFFSET ${skip}`;
    con.query(sql, function(err, results, _fields) {
      if (err) throw err;
      res.status(200).json({
        results,
      });
    });
  });
}
