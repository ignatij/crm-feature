<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
  } from "flowbite-svelte";
  import { ordersStore } from "./orders.store";
  import FollowUpOrders from "./FollowUpOrders.svelte";

  let selectedOrders = [];
</script>

<div class="container">
  {#if $ordersStore.followUpOrders.length > 0}
    <FollowUpOrders followUpOrders={$ordersStore.followUpOrders} />
  {/if}
  {#if selectedOrders.length > 0}
    <div class="btn-container">
      <button
        on:click={() => {
          ordersStore.addToFollowUpOrders(selectedOrders);
        }}>Add to Follow-up Orders</button
      >
    </div>
  {/if}
  <Table>
    <TableHead>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell>Order ID</TableHeadCell>
      <TableHeadCell>Customer ID</TableHeadCell>
      <TableHeadCell>Customer Name</TableHeadCell>
      <TableHeadCell>Product ID</TableHeadCell>
      <TableHeadCell>Product Name</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Total Price</TableHeadCell>
      <TableHeadCell>Date</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each $ordersStore.orders as order}
        <TableBodyRow style={"text-align: center"}>
          <TableBodyCell>
            <input
              type="checkbox"
              on:change={(event) => {
                if (event.target.checked) {
                  selectedOrders = [...selectedOrders, order];
                } else {
                  selectedOrders = selectedOrders.filter(
                    (selectedOrder) => selectedOrder.id !== order.id,
                  );
                }
              }}
            />
          </TableBodyCell>
          <TableBodyCell>{order.orderId}</TableBodyCell>
          <TableBodyCell>{order.customerId}</TableBodyCell>
          <TableBodyCell>{order.customerName}</TableBodyCell>
          <TableBodyCell>{order.productId}</TableBodyCell>
          <TableBodyCell>{order.productName}</TableBodyCell>
          <TableBodyCell>{order.quantity}</TableBodyCell>
          <TableBodyCell>{order.totalPrice}</TableBodyCell>
          <TableBodyCell>{new Date(order.date).toDateString()}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>

<style>
  .container {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .btn-container {
    display: flex;
  }
</style>
