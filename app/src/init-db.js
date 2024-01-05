import pkg from "pg";

import dotenv from "dotenv";
dotenv.config();

const { Client } = pkg;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_NAME;

const pgClient = new Client({
  host,
  user,
  database: "postgres",
  password,
  port,
});
const dbClient = new Client({
  host,
  user,
  database,
  password,
  port,
});

export const createDb = async () => {
  try {
    await pgClient.connect();
    await pgClient.query(`DROP DATABASE IF EXISTS ${database}`);
    await pgClient.query(`CREATE DATABASE ${database}`);

    await dbClient.connect();
    await dbClient.query(`CREATE TABLE ORDERS (
            id INTEGER NOT NULL,
            order_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL,
            customer_name TEXT NOT NULL,
            product_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            quantity SMALLINT NOT NULL,
            total_price DOUBLE PRECISION NOT NULL,
            date DATE NOT NULL
        )`);
  } catch (error) {
    console.error(error);
    throw Error("Error happened while initializing the database!");
  } finally {
    await dbClient.end();
    await pgClient.end();
  }
};
