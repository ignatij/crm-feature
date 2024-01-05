import { writable, derived } from "svelte/store";
import { fetchOrders } from "./orders.service";

const store = writable({ orders: [], followUpOrders: [] });

export const ordersStore = {
  subscribe: store.subscribe,
  fetchOrders: async () => {
    const orders = await fetchOrders();
    store.set({
      orders,
      followUpOrders: [],
    });
  },
  addToFollowUpOrders: (followUpOrders) => {
    store.update(({ orders }) => ({
      orders,
      followUpOrders,
    }));
  },
};
