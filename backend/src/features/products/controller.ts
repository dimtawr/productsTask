import ApiError from '../../common/ApiError';
import productsRepository, { Products } from './repositories';

const products = productsRepository();

const getAllProducts = async () => {
  console.info(`Get request all products`);
  try {
    return await products.getAll();
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const getOneProducts = async (uid: string) => {
  console.info(`Get request output ${uid}`);
  try {
    const data = await products.getOne(uid);
    if (!data) throw new ApiError(404, `This products not found`, '');
    return data;
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const deleteProduct = async (uid: string) => {
  console.info(`Delete product uid = ${uid}`);
  try {
    const isExist = await products.getOne(uid);
    if (!isExist) throw new ApiError(404, 'Product not found', '');
    return await products.deleteProduct(uid);
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const editProduct = async ({ uid, body }: { uid: string; body: Products }) => {
  console.info(`Update product ${uid}, new body:`, body);
  try {
    const isExist = await products.getOne(uid);
    if (!isExist) throw new ApiError(404, 'Product not found', '');
    const nameExist = await products.findName(isExist.name);
    if (nameExist.length > 0) throw new ApiError(400, 'This product name already exist', '');
    return await products.edit({ uid, body });
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const addProduct = async (body: Products) => {
  console.info(`Get request add new product`, body);
  try {
    const nameExist = await products.findName(body.name);
    if (nameExist.length > 0) throw new ApiError(400, 'Product with this name already exist', '');
    return await products.add(body)
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const findProductInStock = async () => {
  console.info('Get request on output all products in stock');
  try {
    const data = await products.findInStock();
    if (data.length === 0) throw new ApiError(500, 'Stock is empty', '');
    return data;
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const findProductsByName = async (name: string) => {
  console.info(`Get request on find products with name=${name}`);
  try {
    const data = await products.findName(name);
    if (data.length === 0) throw new ApiError(404, 'Products with this name not found', '');
    return data;
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const findProductsByNameLike = async (name: string) => {
  console.info(`Get request on find products with name like ${name}`);
  try {
    const data = await products.findNameLike(name);
    if (data.length) throw new ApiError(404, `Products with name like this not found`, '');
    return data;
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const findPriceRange = async ({ after, before }: { after: Number; before: Number }) => {
  console.info(`Get request on find products on price 
    ${after ? `${after} <=` : ''} 
    ${before ? `our products <= ${before}` : 'our products'}`);
};

export {
  getAllProducts,
  getOneProducts,
  deleteProduct,
  editProduct,
  addProduct,
  findProductInStock,
  findProductsByName,
  findProductsByNameLike,
  findPriceRange,
};
