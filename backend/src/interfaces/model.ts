import { Model } from 'sequelize';

export interface IEvent extends Model {
  id: string;
  event_type: string;
  visit_id: string;
  timestamp: Date;
  caregiver_id: string;
  care_recipient_id: string;
  mood: string;
}
