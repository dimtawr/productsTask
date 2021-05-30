import { toast } from 'react-toastify';
import { cacheToken } from '../App';
import { errorHandler } from './errorHandler';

async function req(type, address, uid, body) {
  console.log(cacheToken);
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
      'x-token': cacheToken ? cacheToken : '',
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

async function reqMedia(type, address, uid, body) {
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
      'x-token': cacheToken ? cacheToken : '',
    },
    body: body,
    json: true,
    method: type,
  })
    .then((res) => {
      if (res.ok)
        return toast.success('Done', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

export { req, reqMedia };
