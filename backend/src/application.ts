import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as path from 'path';
import { appRouter as apiRouter } from './routes';
import { IError } from './interfaces';
import { CustomError } from './utils/Error';

const app: express.Express = express();
const isDev: boolean = app.get('env') === 'development';

if (isDev) {
  const logger = require('morgan');
  app.use(logger('dev'));
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  );
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
app.get('/', (_req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error Handlers
app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    const error: IError = new CustomError(
      'Not Found',
      404,
      'The page you are looking for does not exist!'
    );
    next(error);
  }
);

app.use(
  (
    err: IError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (isDev) console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
      error: {
        message: err.message,
        status: status,
        name: err.name,
      },
    });
  }
);

export default app;
