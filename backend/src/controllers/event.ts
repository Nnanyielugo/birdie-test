import { Request, Response, NextFunction } from 'express';
import { EventModel } from '../models/event';

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let limit = 50;
    let skip = 0;

    if (typeof req.query.limit === 'string') {
      limit = parseInt(req.query.limit);
    }

    if (typeof req.query.skip === 'string') {
      skip = parseInt(req.query.skip);
    }

    const events = await EventModel.findAll({
      limit: limit,
      offset: skip,
      attributes: ['payload'],
      order: [['timestamp', 'desc']],
    });
    res.status(200).json({
      events,
    });
  } catch (err) {
    next(err);
  }
}
