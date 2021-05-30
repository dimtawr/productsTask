const { createEffect, createStore } = require('effector');
const { login, registration } = require('./api');

const loginFx = createEffect({
  name: 'login in app',
  handler: (body) => login(body),
});

const registrationFx = createEffect({
  name: 'registr on app',
  handler: (body) => registration(body),
});

const $token = createStore({ user: null, token: null })
  .on(loginFx.done, (_, { result }) => ({ user: result.data.login, token: result.token }))
  .on(registrationFx.done, (_, { result }) => ({ user: result.data.login, token: result.token }));

$token.watch((state) => console.log(state));

export { $token, registrationFx, loginFx };
