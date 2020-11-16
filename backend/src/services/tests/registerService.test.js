import { registerService } from '../registerService';

test('missing username and password', () => {
  let errMessage;
  try {
    registerService.validateUserData(
      undefined,
      undefined,
    );
  } catch (err) {
    errMessage = err.message;
    expect(errMessage).toEqual('Username and/or password is required');
  }
});

test('missing username', () => {
  let errMessage;
  try {
    registerService.validateUserData(
      undefined,
      'password',
    );
  } catch (err) {
    errMessage = err.message;
    expect(errMessage).toEqual('Username and/or password is required');
  }
});

test('missing password', () => {
  let errMessage;
  try {
    registerService.validateUserData(
      'marcika123',
      undefined,
    );
  } catch (err) {
    errMessage = err.message;
    expect(errMessage).toEqual('Username and/or password is required');
  }
});
test('password must be 8 caracter check', () => {
  let errMessage;
  try {
    registerService.validateUserData(
      'marcika123',
      '123456',
    );
  } catch (err) {
    errMessage = err.message;
    expect(errMessage).toEqual('Password must be at least 8 characters');
  }
});
test('wrong username format', () => {
  let errMessage;
  try {
    registerService.validateUserData(
      '__marcika123',
      '12345678',
    );
  } catch (err) {
    errMessage = err.message;
    expect(errMessage).toEqual('Incorrect username format');
  }
});
