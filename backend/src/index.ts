import app from './application';
import * as db from './db';

const port = process.env.PORT || 8000;

async function connect(): Promise<void> {
  console.log('Checking database connection');
  try {
    await db.sequelize.authenticate();
    console.log('Database connection OK');
  } catch (err) {
    console.log('Unable to connect to the database');
    console.log(err.message);
    return;
  }
}

async function init(): Promise<void> {
  await connect();
  console.log(`Starting server on Port: ${port}...`);
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
  });
}

init();
