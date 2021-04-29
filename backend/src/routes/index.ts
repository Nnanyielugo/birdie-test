import * as express from 'express';
import { event } from './event';

const router: express.IRouter = express.Router();

router.use('/events', event);

export const appRouter = router;
