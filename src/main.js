import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import global_ from "./api/global_variables";
import "@/assets/css/icon-font/iconfont.css";

Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global_;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
