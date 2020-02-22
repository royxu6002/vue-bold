<template>
    <div class="nav container">
      <router-link to="/">ToDo</router-link>
      <router-link to="/faq">FAQ</router-link>
      <router-link to="/customer">Customers</router-link>
      <router-link to="/client">客户</router-link>
      <router-link to="/invoice">Invoice&Quotation</router-link>
      <router-link to="/transaction">Transaction</router-link>
      <router-link to="/shipment">Shipment</router-link>
      <router-link to="/test">Test</router-link>
    </div>
</template>
<script>
export default {
    name: "Nav"
}
</script>