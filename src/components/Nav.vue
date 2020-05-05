<template>
    <div class="nav container nav-header">
      <router-link to="/home"><span class="iconfont icon-todo"></span></router-link>
      <router-link to="/faq"><span class="iconfont icon-FAQ"></span></router-link>
      <router-link to="/customer"><span class="iconfont icon-Quotation
"></span></router-link>
      <router-link to="/client"><span class="iconfont icon-client"></span></router-link>
      <router-link to="/invoice"><span class="iconfont icon-icon-menu-invoice"></span></router-link>
      <router-link to="/supplier/index"><span class="iconfont icon-supplier"></span></router-link>
      <router-link to="/transaction"><span class="iconfont icon-Accounting"></span></router-link>
      <router-link to="/shipment"><span class="iconfont icon-shipmenting"></span></router-link>
      <router-link to="/price"><span class="iconfont icon-scalescalculatorcalculationmoneylawla
"></span></router-link>
      <router-link to="/stock"><span class="iconfont icon-candle"></span></router-link>
      <router-link to="/test"><span class="iconfont icon-test
"></span></router-link>
    </div>
</template>
<script>
export default {
    name: "Nav"
}
</script>
<style scoped>
.nav-header{
  font-size: 30px;
  color: #ccc;
  font-weight: 500;
}
</style>