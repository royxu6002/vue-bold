import axios from 'axios';
// import baseUrl from '@/api/global_variables';

const state = {
    customers: null,
    search: null,
};

const getters = {
    filteredCustomers() {
        if(state.search == null || state.search.trim() == '') return state.customers;

        let i = state.search.trim().toLowerCase();
        return state.customers.filter(customer => JSON.stringify(customer).toLowerCase().includes(i));
    }
};

const mutations = {
    SET_CUSTOMERS: (state, customers) => {
        state.customers = customers
    },
    SET_SEARCH: (state, keywords) => {
        state.search = keywords
    }
};

const actions = {
    get({commit}) {
        let baseUrl = '';
        process.env.NODE_ENV === "development" ? baseUrl =  'http://iot.test/api/v1' : baseUrl = '/apis/api/v1';
        axios.get( baseUrl +'/customer')
      .then((res) => {
        commit('SET_CUSTOMERS', res.data);
      })
      .catch((err) => alert(err));
    },
    inputKeywords({commit}, params)  {
        commit('SET_SEARCH', params);
    },
};

const customers = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export default customers;