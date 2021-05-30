import express from 'express';
import ApiError from '../../common/ApiError';
import { authUser, registeringUser } from './controller';
import { authValidation, registrValidation } from './schemas';

const router = express.Router();
router.use(express.json());

router.post('/login', async (req, res, next) => {
  try {
    const isNotValid = authValidation(req.body);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await authUser(req.body));
  } catch (e) {
    return next(e);
  }
});

router.post('/registr', async (req, res, next) => {
  try {
    const isNotValid = registrValidation(req.body);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await registeringUser(req.body));
  } catch (e) {
    return next(e);
  }
});

export default router;
