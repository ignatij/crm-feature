import express from "express";
import { createDb } from "./init-db.js";
import { initOrders } from "./init-orders.js";
import { save, findAll } from "./service/orders.service.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/api/orders", async (_, res) => {
  const orders = await findAll();
  res.send(orders);
});
app.listen(port, async () => {
  await createDb();
  const orders = await initOrders();
  await Promise.all(orders.map((order) => save(order)));
  console.log(`API server listening on ${port}`);
});
