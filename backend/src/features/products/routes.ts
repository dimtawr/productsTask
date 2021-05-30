import express from 'express';
import ApiError from '../../common/ApiError';
import {
  addProduct,
  deleteProduct,
  editProduct,
  findPriceRange,
  findProductInStock,
  findProductsByName,
  findProductsByNameLike,
  getAllProducts,
  getOneProducts,
  addImage,
  deleteImage,
} from './controller';
import {
  uuidValidation,
  addValidation,
  editValidation,
  nameValidation,
  priceRangeValidation,
} from './schemas';
const fileUpload = require('express-fileupload');

const router = express.Router();
router.use(express.json());
router.use(fileUpload());

router.get('/', async (req, res, next) => {
  try {
    //@ts-ignore
    return res.respondWith(await getAllProducts());
  } catch (e) {
    return next(e);
  }
});

router.get('/inStock', async (req, res, next) => {
  try {
    //@ts-ignore
    return res.respondWith(await findProductInStock());
  } catch (e) {
    return next(e);
  }
});

router.get('/name/:id', async (req, res, next) => {
  try {
    const isNotValid = nameValidation(req.params.id);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await findProductsByName(req.params.id));
  } catch (e) {
    next(e);
  }
});

router.get('/name-like/:id', async (req, res, next) => {
  try {
    const isNotValid = nameValidation(req.params.id);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await findProductsByNameLike(req.params.id));
  } catch (e) {
    next(e);
  }
});

router.post('/price-range', async (req, res, next) => {
  try {
    const isNotValid = priceRangeValidation(req.body);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await findPriceRange(req.body));
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const isNotValid = uuidValidation(req.params.id);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await getOneProducts(req.params.id));
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const isNotValid = uuidValidation(req.params.id);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await deleteProduct(req.params.id));
  } catch (e) {
    return next(e);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const isNotValid = editValidation(req.body);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await editProduct(req.body));
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const isNotValid = addValidation(req.body);
    if (isNotValid) throw new ApiError(400, isNotValid.message, isNotValid);
    //@ts-ignore
    return res.respondWith(await addProduct(req.body));
  } catch (e) {
    next(e);
  }
});

router.post('/image', async (req, res, next) => {
  try {
    //@ts-ignore
    return res.respondWith(await addImage(req.files));
  } catch (e) {
    next(e);
  }
});

router.delete('/image/:id', async (req, res, next) => {
  try {
    //@ts-ignore
    return res.respondWith(await deleteImage(req.params.id));
  } catch (e) {
    next(e);
  }
});

export default router;
