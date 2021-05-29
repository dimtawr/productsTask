require('dotenv').config()

const {
  DB_CLIENT,
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_PASSWORD
} = process.env

module.exports = {

  development: {
    client: DB_CLIENT,
    connection: {
      database: DB_DATABASE,
      user:     DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
