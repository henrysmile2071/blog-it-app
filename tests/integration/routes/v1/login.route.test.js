import { readFile } from 'fs/promises';
import {
  request, expect, httpStatus, server,
} from '../../setup.test.js';
import { truncateTables, insertData } from '../../../db.test.js';

let data;

describe('Login Endpoint', () => {
  before((async () => {
    data = JSON.parse(await readFile(new URL('../../../fixtures/input.json', import.meta.url)));
  }));

  describe('POST /api/login', () => {
    before(async () => {
      await truncateTables();
      await insertData(data.loginValid);
    });

    it('should return 200 and return a jwt token', async () => {
      const res = await request(server)
        .post('/api/login')
        .send(data.loginValid)
        .expect(httpStatus.OK);

      expect(res.body).to.have.property('body');
      expect(res.body).to.not.be.undefined;
    });

    it('should return error if email is invalid', async () => {
      await request(server)
        .post('/api/login')
        .send(data.loginFormatError)
        .expect(httpStatus.BAD_REQUEST);
    });

    it('should return error if password is invalid', async () => {
      await request(server)
        .post('/api/login')
        .send(data.loginPasswordError)
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
