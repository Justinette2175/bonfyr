require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT
    },
    migrations: {
      directory: '../db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: '../db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};