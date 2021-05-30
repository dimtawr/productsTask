
exports.up = async (knex) => {
  await knex.schema.table('products', (t) => {
    t.binary('image')
  })
};

exports.down = async (knex) => {
  await knex.schema.table('products', (t) => {
    t.dropColumn('image')
  })
};
