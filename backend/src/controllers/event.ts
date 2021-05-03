import { Request, Response, NextFunction } from 'express';
import { EventModel } from '../models/event';

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let limit = 0;
    let skip = 0;

    if (typeof req.query.limit === 'string') {
      limit = parseInt(req.query.limit);
    }

    if (typeof req.query.skip === 'string') {
      skip = parseInt(req.query.skip);
    }

    const { rows, count } = await EventModel.findAndCountAll({
      limit: limit,
      offset: skip,
      attributes: ['payload'],
      order: [['timestamp', 'desc']],
    });
    res.status(200).json({
      events: rows,
      limit,
      skip,
      total: count,
      pages: Math.ceil(count / limit),
    });
  } catch (err) {
    next(err);
  }
}

export async function getMoods(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let limit = 0;
    let skip = 0;

    if (typeof req.query.limit === 'string') {
      limit = parseInt(req.query.limit);
    }

    if (typeof req.query.skip === 'string') {
      skip = parseInt(req.query.skip);
    }

    const { rows, count } = await EventModel.findAndCountAll({
      limit: limit,
      offset: skip,
      attributes: ['payload'],
      where: {
        event_type: 'mood_observation',
      },
      order: [['timestamp', 'desc']],
    });
    res.status(200).json({
      moods: rows,
      limit,
      skip,
      total: count,
      pages: Math.ceil(count / limit),
    });
  } catch (err) {
    next(err);
  }
}
