import 'jest';
import app from '../src/application';
import * as request from 'supertest';
import { sequelize } from '../src/db';

describe('Events Controller', (): void => {
  afterAll(
    async (done): Promise<void> => {
      await sequelize.close();
      done();
    }
  );

  describe('Passing tests', (): void => {
    it('Fetches Events', async (): Promise<void> => {
      const limit = 20;
      const response = await request(app)
        .get('/api/events')
        .query({ limit });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('events');
      expect(response.body.events.length).toBe(limit);
      expect(response.body.events[0]).toHaveProperty('payload');
    });

    it('Fetches Moods', async (): Promise<void> => {
      const limit = 20;
      const response = await request(app)
        .get('/api/events/moods')
        .query({ limit });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('events');
      expect(response.body.events.length).toBe(limit);
      expect(response.body.events[0]).toHaveProperty('payload');
    });
  });

  describe('Failing tests', (): void => {
    it('Returns 404 error on wrong route', async (): Promise<void> => {
      const response = await request(app).get('/api/notfound');

      console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toEqual(
        'The page you are looking for does not exist!'
      );
    });
  });
});
