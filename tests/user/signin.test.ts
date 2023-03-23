import { StatusCodes } from 'http-status-codes';
import { User } from '../../src/server/database/models';
import { testServer } from '../jest.setup';

describe('User Controller - SignIn', () => {
  it('Create User', async () => {
    const response = await testServer.post('/user/signup').send({
      cd_status: 1,
      nm_email: 'emailtest@test.com',
      nm_pass: '123456',
      nm_user: 'nametest',
    } as Omit<User, 'id'>);

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

  it('Error when registering a user with duplicate email', async () => {
    await testServer.post('/user/signup').send({
      cd_status: 1,
      nm_email: 'emailtestduplciate@test.com',
      nm_pass: '123456',
      nm_user: 'nametest',
    } as Omit<User, 'id'>);

    const response2 = await testServer.post('/user/signup').send({
      cd_status: 1,
      nm_email: 'emailtestduplciate@test.com',
      nm_pass: '123456',
      nm_user: 'nametest',
    } as Omit<User, 'id'>);

    expect(response2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response2.body).toHaveProperty('errors.default');
  });

  it('Error when registering a user without email', async () => {
    const response = await testServer.post('/user/signup').send({
      cd_status: 1,
      nm_email: '',
      nm_pass: '123456',
      nm_user: '',
    } as Omit<User, 'id'>);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.nm_email).toEqual('Deve ter pelo menos 5 caracteres');
  });

  it('Error when registering a user without name', async () => {
    const response = await testServer.post('/user/signup').send({
      cd_status: 1,
      nm_email: 'emailtestduplciate@test.com',
      nm_pass: '123456',
      nm_user: '',
    } as Omit<User, 'id'>);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.nm_user).toEqual('Deve ter pelo menos 5 caracteres');
  });

  it('Error when registering a user without pass', async () => {
    const response = await testServer.post('/user/signup').send({
      cd_status: 1,
      nm_email: 'emailtestduplciate@test.com',
      nm_pass: '',
      nm_user: '123456',
    } as Omit<User, 'id'>);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.nm_pass).toEqual('Deve ter pelo menos 6 caracteres');
  });
});
