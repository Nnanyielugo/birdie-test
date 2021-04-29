import { DataTypes, Model } from 'sequelize';
import * as db from '../db';

interface Event extends Model {
  id: string;
  event_type: string;
  visit_id: string;
  timestamp: Date;
  caregiver_id: string;
  care_recipient_id: string;
  mood: string;
}

export const EventModel = db.sequelize.define<Event>(
  'events',
  {
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    event_type: {
      type: DataTypes.STRING,
    },
    visit_id: {
      type: DataTypes.STRING,
    },
    timestamp: {
      type: DataTypes.DATE,
    },
    caregiver_id: {
      type: DataTypes.STRING,
    },
    care_recipient_id: {
      type: DataTypes.STRING,
    },
    mood: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
