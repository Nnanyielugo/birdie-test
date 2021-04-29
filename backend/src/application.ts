import * as express from 'express';
import * as logger from 'morgan';
import { appRouter as apiRouter } from './routes';

const app: express.Express = express();
const isDev: boolean = process.env.NODE_ENV === 'development';
if (isDev) {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

export default app;
