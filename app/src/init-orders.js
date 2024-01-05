import { pipeline, PassThrough } from "stream";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { mapper } from "./mapper.js";

const csvParser = parse({ skip_records_with_error: true, columns: true });

export const initOrders = () => {
  const orders = [];
  return new Promise((resolve, reject) => {
    pipeline(
      createReadStream("./homework_order_lines.csv"),
      csvParser,
      new PassThrough({
        objectMode: true,
        transform(chunk, enc, cb) {
          const order = {};
          for (const key in mapper) {
            order[mapper[key]] = chunk[key];
          }
          orders.push(order);
          cb();
        },
      }),
      (err) => {
        if (err) {
          console.log("Error happened with the pipeline", err);
          reject(err);
        }
        resolve(orders);
      }
    );
  });
};
