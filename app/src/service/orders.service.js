import * as ordersRepository from "../repository/orders.repository.js";

export const findAll = () => {
  return ordersRepository.findAll();
};

export const save = (order) => {
  return ordersRepository.save(order);
}