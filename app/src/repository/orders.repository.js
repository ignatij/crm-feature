import { pool } from "./pool.js";
import { randomUUID } from "crypto";

export const findAll = async () => {
  try {
    const result = await pool.query("select * from orders order by id");
    return result.rows.map((order) => ({
      id: order.id,
      orderId: order.order_id,
      productId: order.product_id,
      customerName: order.customer_name,
      customerId: order.customer_id,
      productName: order.product_name,
      quantity: order.quantity,
      totalPrice: order.total_price,
      date: order.date,
    }));
  } catch (e) {
    console.error(e);
    throw new Error("Error while fetching orders from db!");
  }
};

export const save = async (order) => {
  const {
    id,
    orderId,
    productId,
    customerId,
    customerName,
    productName,
    quantity,
    totalPrice,
    date,
  } = order;
  try {
    const uid = randomUUID();
    const insertQuery = `insert into orders (
      id, 
      order_id, 
      customer_id,
      customer_name, 
      product_id, 
      product_name, 
      quantity, 
      total_price, 
      date) values (
      '${id}',
      ${orderId},
      ${customerId},
      '${customerName}',
      ${productId},
      '${productName}',
      ${quantity},
      ${totalPrice},
      '${date}'
    )`;
    await pool.query(insertQuery);
  } catch (e) {
    console.error("Error happened with the saving of the order:", order, e);
    throw new Error("Error while saving order!");
  }
};
