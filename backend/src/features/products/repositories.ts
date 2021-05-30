import knex from '../../common/connection';

export type Products = {
  uid?: string;
  name: string;
  amount: number;
  price: number;
};

const db = knex;
const productsRepository = () => {
  const getAll = async () => {
    return await db.select().from('products');
  };
  const getOne = async (uid: string | undefined) => {
    const [data] = await db.select().from('products').where({ uid });
    return data;
  };
  const edit = async ({ uid, ...body }: Products) => {
    const [data] = await db
      .from('products')
      .update(body)
      .where({ uid })
      .returning(['uid', 'name', 'amount', 'price', 'image']);
    return data;
  };
  const add = async (body: Products) => {
    const [data] = await db
      .insert(body)
      .into('products')
      .returning(['uid', 'name', 'amount', 'price', 'image']);
    return data;
  };
  const deleteProduct = async (uid: string) => {
    await db.from('products').delete().where({ uid });
    return getAll();
  };
  const findNameLike = async (name: string) => {
    return await db
      .select()
      .from('products')
      .whereRaw("LOWER(name) LIKE '%' || LOWER(?) || '%' ", name);
  };
  const findName = async (name: string) => {
    return await db.select().from('products').whereRaw('LOWER(name) = LOWER(?)', name);
  };
  const findPriceRange = async ({ after, before }: { after: Number; before: Number }) => {
    const data = await db.select().from('products').where('price', '>=', String(after));
    if (before) return data.filter((element) => element.price <= before);
    return data;
  };
  const findInStock = async () => {
    return await db.select().from('products').where('amount', '>', 0);
  };
  const addImage = async (uid: string, data: Buffer) => {
    return await db.update('image', data).into('products').where({ uid });
  };
  const deleteImage = async (uid: string) => {
    return await db.update('image', null).into('products').where({ uid });
  };
  return {
    getAll,
    getOne,
    deleteProduct,
    add,
    edit,
    findInStock,
    findName,
    findNameLike,
    findPriceRange,
    addImage,
    deleteImage,
  };
};

export default productsRepository;
