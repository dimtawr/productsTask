
exports.up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.uuid("uid").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    t.string('login')
    t.string('password')
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTable("users")
};
