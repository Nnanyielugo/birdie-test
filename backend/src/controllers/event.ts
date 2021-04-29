import { Request, Response, NextFunction } from 'express';
import { EventModel } from '../models/event';

export async function findAll(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const events = await EventModel.findAll();
    res.status(200).json({
      events,
    });
  } catch (err) {}
}
