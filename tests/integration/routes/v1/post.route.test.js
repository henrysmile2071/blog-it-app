import { readFile } from 'fs/promises';
import {
  request, expect, httpStatus, server,
} from '../../setup.test.js';
import { truncateTables, insertData } from '../../../db.test.js';

let data;

describe('Post Endpoint', () => {
  let token;

  before((async () => {
    data = JSON.parse(await readFile(new URL('../../../fixtures/input.json', import.meta.url)));
    await truncateTables();
    await insertData(data.loginValid);
    const res = await request(server)
      .post('/api/login')
      .send(data.loginValid);
    token = res.body.body;
  }));

  describe('POST /api/posts', () => {
    it('should create a post successfully', async () => {
      const res = await request(server)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Post', content: 'This is a test post' });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('success', true);
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(server)
        .post('/api/posts')
        .send({ title: 'Test Post', content: 'This is a test post' });

      expect(res.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should return 400 if title is empty', async () => {
      const res = await request(server)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'This is a test post' });

      expect(res.status).to.equal(httpStatus.BAD_REQUEST);
    });
  });
});
