import knex from '../../common/connection';

const jwt = require('njwt');

export type User = {
  uid?: string;
  login: string;
  password: string;
  confirmPassword?: string;
};

const db = knex;
const usersRepository = () => {
  const getUser = async (login: string) => {
    const [data] = await db
      .select()
      .from('users')
      .whereRaw(`LOWER(login) = ?`, login.toLowerCase());
    return data;
  };
  const getUserByUid = async (uid: string) => {
    const [data] = await db.select().from('users').where({ uid });
    return data;
  };
  const registration = async (body: User) => {
    const [data] = await db.insert(body).into('users').returning(['uid', 'login', 'password']);
    return data;
  };
  const generateToken = async (sub: string) => {
    const token = jwt.create({ sub }, 'test_task').setExpiration(null);
    return token.compact();
  };
  const verifyToken = async (token: string) =>
    new Promise((resolve, reject) =>
      jwt.verify(token, 'test_task', async (err: Error, verifedJwt: any) => {
        if (err) return resolve(false);
        else {
          const userByToken = await getUserByUid(verifedJwt.body.sub);
          if (userByToken) return resolve(true);
        }
        return resolve(false);
      }),
    );

  return {
    getUser,
    registration,
    generateToken,
    verifyToken,
  };
};

export default usersRepository;
