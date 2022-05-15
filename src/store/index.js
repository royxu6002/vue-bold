import Vue from "vue";
import Vuex from "vuex";

import customers from './modules/customers-modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    customers
  }
});