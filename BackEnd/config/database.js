const env = require("dotenv").config();

const { Client } = require("pg");
console.log(env.parsed);

module.exports.getClient = async () => {
  const client = new Client({
    user: env.parsed.DB_USER,
    host: env.parsed.DB_HOST,
    database: env.parsed.DB_DATABASE,
    password: env.parsed.DB_PASSWORD,
    port: 5432,
  });
  await client.connect();
  return client;
};
