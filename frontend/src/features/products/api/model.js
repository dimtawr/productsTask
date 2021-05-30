import { createEffect, createStore } from 'effector';
import {
  getProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
  addProduct,
  productsInStock,
  findByProductName,
  findByProductNameLike,
  findProductsByPriceRange,
} from './api';

const getAllProductsFx = createEffect({
  name: 'get all products',
  handler: () => getProducts(),
});

const getOneProductFx = createEffect({
  name: 'get one product',
  handler: (uid) => getOneProduct(uid),
});

const editProductFx = createEffect({
  name: 'edit product',
  handler: (body) => editProduct(body),
});

const deleteProductFx = createEffect({
  name: 'delete product',
  handler: (uid) => deleteProduct(uid),
});

const addProductFx = createEffect({
  name: 'add new product',
  handler: (body) => addProduct(body),
});

const productsInStockFx = createEffect({
  name: 'output products in stock',
  handler: () => productsInStock(),
});

const findByProductNameFx = createEffect({
  name: 'find product by name',
  handler: (name) => findByProductName(name),
});

const findByProductNameLikeFx = createEffect({
  name: 'find products by name like',
  handler: (name) => findByProductNameLike(name),
});

const findProductsByPriceRangeFx = createEffect({
  name: 'find products on price range',
  handler: (body) => findProductsByPriceRange(body),
});

const $products = createStore([])
  .on(getAllProductsFx.done, (_, { result }) => result)
  .on(getOneProductFx.done, (_, { result }) => result)
  .on(editProductFx.done, (_, { result }) => {
    getAllProductsFx();
  })
  .on(deleteProductFx.done, (_, { result }) => result)
  .on(addProductFx.done, (oldState, { result }) => [...oldState, result])
  .on(addProductFx.fail, (oldState, { result }) => oldState)
  .on(productsInStockFx.done, (_, { result }) => result)
  .on(findByProductNameLikeFx.done, (_, { result }) => result)
  .on(findByProductNameFx.done, (_, { result }) => result)
  .on(findProductsByPriceRangeFx.done, (_, { result }) => result);

$products.watch((state) => console.log('-> Products', state));

export {
  $products,
  getAllProductsFx,
  getOneProductFx,
  editProductFx,
  deleteProductFx,
  addProductFx,
  productsInStockFx,
  findProductsByPriceRangeFx,
  findByProductNameLikeFx,
  findByProductNameFx,
};
