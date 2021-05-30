import usersRepository from '../features/users/repositories';

const users = usersRepository();

async function checkToken(req: any) {
  if (await users.verifyToken(req.headers['x-token']).then((x) => x)) return true;
  return false;
}

export default checkToken;
