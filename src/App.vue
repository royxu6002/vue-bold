<template>
  <div id="app">
    <div class="nav container">
      <span class="iconfont icon-account"></span>
      <router-link to="/">Todo</router-link>
      <router-link to="/faq">FAQ</router-link>
      <router-link to="/customer">Customers</router-link>
      <router-link to="/client">客户</router-link>
      <router-link to="/invoice">Invoice</router-link>
      <router-link to="/transaction">Transaction</router-link>
      <router-link to="/quotation">Quotation</router-link>
      <router-link to="/test">Test</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
.nav {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
  color: #fff;
}
</style>
