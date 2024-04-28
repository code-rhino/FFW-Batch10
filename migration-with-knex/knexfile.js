require('dotenv').config();


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection:process.env.DATABASE_URL,
    migrations: {
      directory: './migrations'
    }
  }

};
