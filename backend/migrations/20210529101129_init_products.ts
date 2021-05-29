
exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('products', (t) => {
    t.uuid('uid').primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string('name')
    t.decimal('price')
    t.number('amount')
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products')
};
