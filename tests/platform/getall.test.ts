import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Platform - GetAll', () => {
  it('Get all platforms', async () => {
    const result = await testServer.get('/platform').send();

    //expect(Number(result.header['x-total-count'])).toBeGreaterThan(0);
    expect(result.statusCode).toEqual(StatusCodes.OK);
    expect(result.body.length).toBeGreaterThan(0);
  });
});
