import { loginService } from '../loginService';
import { userRepo } from '../../repositories';

const database = {
  user1: {
    username: 'marci',
    password: '$2b$10$0BkmlcSgF4Vs8IxPqt8S/uKQDkBS3kNbCXCX0htPDcz0B/7605DFi',
    id: 1,
    cash: 0,
  },
  user2: {
    username: 'zoli',
    password: '$2b$10$sWmdFqL87flO56Op4g79Eu/wTomkp7DVuU2rvb/MsunQAZSUsjxNu',
    id: 2,
    cash: 0,
  },
  user3: {
    username: 'peti',
    password: '$2b$10$f0kByEGrCZ.78E.KVmONOOoskilCU8z7ctyGvwSKEqg715hIEy22u',
    id: 3,
    cash: 0,
  },
};

test('missing username and password', async () => {
  const errorMessage = loginService.validateUser(undefined, undefined);
  expect(errorMessage).toEqual({ status: 400, message: 'All fields required' });
});

test('missing username', async () => {
  const errorMessage = loginService.validateUser(undefined, 'password');
  expect(errorMessage).toEqual({ status: 400, message: 'Username is required' });
});

test('missing password', async () => {
  const errorMessage = loginService.validateUser('username', undefined);
  expect(errorMessage).toEqual({ status: 400, message: 'Password is required' });
});

test('bad username', async () => {
  let thrownError;
  const spy = jest.spyOn(userRepo, 'getUser');
  spy.mockReturnValue({ results: [], fields: 'somedata' });
  try {
    await loginService.getToken('username', 'password');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ status: 400, message: 'Username or password is incorrect' });
});

test('bad password', async () => {
  let thrownError;
  const spy = jest.spyOn(userRepo, 'getUser');
  spy.mockReturnValue({ results: [database.user1], fields: 'somedata' });
  try {
    await loginService.getToken('marci', 'badpassword');
  } catch (err) {
    thrownError = err;
  }
  expect(thrownError).toEqual({ status: 400, message: 'Username or password is incorrect' });
});

test('succesful login', async () => {
  const spy = jest.spyOn(userRepo, 'getUser');
  spy.mockReturnValue({ results: [database.user1], fields: 'somedata' });
  const token = await loginService.getToken('marci', 'password');
  expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
});
