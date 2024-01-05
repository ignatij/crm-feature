<script>
  export let followUpOrders;
</script>

<h3>Follow up orders</h3>
<div>
  Total items: {followUpOrders.length}
</div>
<div>
  Total amount: {followUpOrders.reduce(
    (acc, curr) => (acc += curr.totalPrice),
    0,
  )}
</div>