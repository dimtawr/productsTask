import { req } from '../../../lib/request';

const page = 'products';

async function getProducts() {
  return req('GET', page);
}

async function getOneProduct(uid) {
  return req('GET', page, uid);
}

async function deleteProduct(uid) {
  return req('DELETE', page, uid);
}

async function editProduct(body) {
  return req('PUT', page, null, body);
}

async function addProduct(body) {
  return req('POST', page, null, body);
}

async function productsInStock() {
  return req('GET', page + '/inStock');
}

async function findByProductName(name) {
  return req('GET', page + '/name', name);
}

async function findByProductNameLike(name) {
  return req('GET', page + '/name-like', name);
}

async function findProductsByPriceRange(body) {
  return req('POST', page + '/price-range', null, body);
}

export {
  getProducts,
  getOneProduct,
  addProduct,
  deleteProduct,
  productsInStock,
  findByProductName,
  findByProductNameLike,
  findProductsByPriceRange,
  editProduct,
};
