// Update with your config settings.
require("dotenv").config();
const dbConfig = require("./envConfig");
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  testing: {
    client: "pg",
    connection: dbConfig.module,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  },

  development: {
    client: "pg",
    connection: dbConfig.module,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  }
};
