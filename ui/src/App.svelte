<script>
  import { onMount } from "svelte";
  import Orders from "./lib/orders/Orders.svelte";
  import { ordersStore } from "./lib/orders/orders.store";

  onMount(async () => {
    await ordersStore.fetchOrders();
  });
</script>

<main>
  <Orders />
</main>
