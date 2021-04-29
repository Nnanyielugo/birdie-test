import * as express from 'express';
import * as controller from '../controllers/event';

const router: express.IRouter = express.Router();

router.get('/', controller.findAll);

export const event = router;
