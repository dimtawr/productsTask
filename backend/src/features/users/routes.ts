import express from 'express';
import { authUser, registeringUser } from './controller';

const router = express.Router();
router.use(express.json());

router.post('/login', async (req, res, next) => {
  try {
    //@ts-ignore
    return res.respondWith(await authUser(req.body));
  } catch (e) {
    return next(e);
  }
});

router.post('/registr', async (req, res, next) => {
  try {
    //@ts-ignore
    return res.respondWith(await registeringUser(req.body));
  } catch (e) {
    return next(e);
  }
});

export default router;
