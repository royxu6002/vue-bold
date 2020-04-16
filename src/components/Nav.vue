<template>
    <div class="nav container">
      <router-link to="/home">ToDo</router-link>
      <router-link to="/faq">FAQ</router-link>
      <router-link to="/customer">Customer Leads</router-link>
      <router-link to="/client">Client</router-link>
      <router-link to="/invoice">Invoice</router-link>
      <router-link to="/transaction">Transaction</router-link>
      <router-link to="/shipment">Shipment</router-link>
      <router-link to="/price">Price</router-link>
      <router-link to="/stock">Stock</router-link>
      <router-link to="/test">Test</router-link>
    </div>
</template>
<script>
export default {
    name: "Nav"
}
</script>