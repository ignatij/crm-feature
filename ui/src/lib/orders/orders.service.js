import { get } from "../../core/http";
const backendPrefix = import.meta.env.VITE_BACKEND_URL;

export const fetchOrders = async () => {
  try {
    const response = await get(`${backendPrefix}/api/orders`);
    return response.json();
  } catch (e) {
    console.error(e);
    throw new Error("Error happened while loading order");
  }
};
