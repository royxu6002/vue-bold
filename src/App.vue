<template>
  <div id="app">
    <div class="nav container">
      <span class="iconfont icon-account"></span>
      <router-link to="/">Todo</router-link>
      <router-link to="/faq">Favorite asked questions</router-link>
      <router-link to="/customer">Customers</router-link>
      <router-link to="/invoice">Invoice</router-link>
      <router-link to="{name: 'QuotationCreate'}">Quotation</router-link>
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
