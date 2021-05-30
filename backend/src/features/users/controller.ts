import ApiError from '../../common/ApiError';
import usersRepository, { User } from './repositories';
import bcrypt from 'bcrypt';

const users = usersRepository();

const registeringUser = async (body: User) => {
  try {
    console.info(`Registration new user ${body.login}`);
    const existUser = await users.getUser(body.login);
    if (existUser) throw new ApiError(400, 'User with this email already exist', 'repead email');
    delete body.confirmPassword;
    const newUser = await users.registration({
      ...body,
      password: await bcrypt.hash(body.password, 12),
    });
    //@ts-ignore
    const token = await users.generateToken(newUser.uid);
    return { data: newUser, token };
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const authUser = async (body: User) => {
  try {
    console.info(`Auth user ${body.login}`);
    const authUser = await users.getUser(body.login);
    if (!authUser) throw new ApiError(404, 'Wrong login or password', '');
    const hashMatches = await bcrypt.compare(body.password, authUser.password);
    if (!hashMatches) throw new ApiError(404, 'Wrong login or password', '');
    const token = await users.generateToken(authUser.uid);
    return { data: authUser, token };
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

export { authUser, registeringUser };
