<template>
  <div class="customers mt-3">
    <div class="customers_header">
      <span>this is a page for customer list</span>
      <router-link :to="{name: 'CustomerCreate'}">
        <span class="btn btn-default customer_add"><i class="iconfont icon-add-account mr-2"></i>Add</span>
      </router-link>
    </div>
    <div></div>
    <div class="customers_body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index">
            <th scope="row">
              <router-link
                :to="{name: 'CustomerShow', params: { id: customer.id}}"
                >{{ customer.id }}
                <i class="iconfont icon-more"></i>
                </router-link>
            </th> 
            <td>{{customer.person}}</td>
            <td>{{customer.email}}</td>
            <td>{{customer.country}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Customer',
  data() {
    return {
      customers: ''
    }
  },
  methods: {
    fetchCustomersData() {
      axios.get(this.GLOBAL.baseUrl + "/customer").then(res => {
        this.customers = res.data;
      })
      // .then(err => {
      //   alert(err);
      // })
    },
    goTo(id) {
      this.$router.replace({path: '/customer', params: {id: id}});
    }
  },
  created() {
    this.fetchCustomersData();
  }

}
</script>
<style>
.customers_header {
  background-color: coral;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}
.customers_body {
  display: flex;
  justify-content: flex-start;
}
.customer_add{
  color: #fff;
}
</style>
