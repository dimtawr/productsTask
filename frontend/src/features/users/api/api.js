const { req } = require('../../../lib/request');

const page = 'users';

async function login(body) {
  return req('POST', page, 'login', body);
}

async function registration(body) {
  return req('POST', page, 'registr', body);
}

export { login, registration };
