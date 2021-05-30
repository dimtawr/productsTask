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

const editProduct = async (body: Products) => {
  try {
    console.info(`Update product ${body.uid}, new body:`, body);
    const isExist = await products.getOne(body.uid);
    if (!isExist) throw new ApiError(404, 'Product not found', '');
    const nameExist = await products.findName(body.name);
    if (nameExist[0]) {
      if (nameExist.length > 1 || (nameExist.length === 1 && nameExist[0].uid !== body.uid))
        throw new ApiError(400, 'This product name already exist', '');
    }
    return await products.edit(body);
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const addProduct = async (body: Products) => {
  console.info(`Get request add new product`, body);
  try {
    const nameExist = await products.findName(body.name);
    if (nameExist.length > 0) throw new ApiError(400, 'Product with this name already exist', '');
    return await products.add(body);
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
    if (data.length === 0) throw new ApiError(404, `Products with name like this not found`, '');
    return data;
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const findPriceRange = async ({ after, before }: { after: Number; before: Number }) => {
  if (!after) after = 0;
  console.info(`Get request on find products on price 
    ${after} <= our products <= ${before ? before : 'ထ'}`);
  try {
    return await products.findPriceRange({ after, before });
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const addImage = async (file: any) => {
  try {
    const uid = Object.keys(file)[0];
    console.info(`Add image to ${uid}`);
    try {
      return await products.addImage(uid, file[uid].data);
    } catch (e) {}
    return true;
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
};

const deleteImage = async (uid: string) => {
  try {
    console.info(`Delete image to ${uid}`);
    return await products.deleteImage(uid);
  } catch (e) {
    throw new ApiError(500, e.message, e);
  }
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
  addImage,
  deleteImage,
};
