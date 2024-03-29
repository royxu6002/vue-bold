import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import PrimeVue
// import PrimeVue from 'primevue/config';
// Vue.use(PrimeVue);
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';

// 引入 bignumber.js 来更正运算;
import bigNumber from "bignumber.js";
Vue.prototype.BIGNUMBER = bigNumber;

// 引入 baseUrl, 开发环境使用的 developmentUrl, webpack 打包时候, 使用的 productionUrl;
import _global from "./api/global_variables";
Vue.prototype.GLOBAL = _global;

// 引入全局 BILLFROM, BENEFICIARY api
import billfrom from "./api/bill";
Vue.prototype.BILLFROM = billfrom;
import beneficiary from "./api/beneficiary";
Vue.prototype.BENEFICIARY = beneficiary;

// 引入 icon 图标
import "@/assets/css/icon-font/iconfont.css";

import axios from "./util/http";
Vue.prototype.axios = axios;

import qs from "qs";
Vue.prototype.qs = qs;

// 按需引入 Element-UI组件
// import 'element-ui/lib/theme-chalk/index.css';
import { Button, Form, FormItem, Input, Upload, Row, Container } from 'element-ui';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Container);


Vue.config.productionTip = false;

// 全局组件 Nav
import Nav from "./components/Nav";
Vue.component("Nav", Nav);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
