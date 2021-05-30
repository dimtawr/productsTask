import { errorHandler } from './errorHandler';

async function req(type, address, uid, body) {
  const requestAddress = uid
    ? `http://localhost:8080/` + address + '/' + uid
    : `http://localhost:8080/` + address;
  console.log(
    'Request on: ',
    await requestAddress,
    '\n',
    'Type: ',
    type,
    '\n',
    'Body: ',
    body,
    '\n',
    'UID: ',
    uid,
  );
  const data = await fetch(await requestAddress, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
    json: true,
    method: type,
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch(async (res) => {
      const body = await res.json();
      errorHandler(body.errors);
      throw body;
    });
  console.log('type response:', typeof data.data);
  return data.data;
}

export { req };
