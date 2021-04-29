import { DataTypes } from 'sequelize';
import { IEvent } from '../interfaces';
import * as db from '../db';

export const EventModel = db.sequelize.define<IEvent>(
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
