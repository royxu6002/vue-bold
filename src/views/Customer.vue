<template>
  <div class="customers mt-3">
    <Nav />
    <div class="customers_header">
      <span>this is a page for customer list</span>
      <router-link :to="{ name: 'CustomerCreate' }">
        <span class="btn btn-default customer_add">
          <i class="iconfont icon-add-account mr-2"></i>
          Add
        </span>
      </router-link>
      <input type="text" v-model="keywords" />
    </div>

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
          <tr v-for="(customer, index) in filteredBy" :key="index">
            <th scope="row">
              <router-link
                :to="{ name: 'CustomerShow', params: { id: customer.id } }"
                >{{ customer.id }}
                <i class="iconfont icon-more"></i>
              </router-link>
            </th>
            <td>{{ customer.person }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.country }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Customer",
  data() {
    return {
      customersData: [],
      keywords: ""
    };
  },
  methods: {
    getCustomersData() {
      axios.get(this.GLOBAL.baseUrl + "/customer").then(res => {
        this.customersData = res.data;
      });
      // .then(err => alert(err))
    },
    goTo(id) {
      this.$router.replace({ path: "/customer", params: { id: id } });
    },
    search(s) {
      let sear = s.trim().toLowerCase();
      if (!sear) return alert("please type something");

      // 数据中有空字符串, 导致过滤有困难
      let data = this.customersData.filter(customer => {
        if (!customer.email) return;
      });
      if (data.length == 0) return alert("we dont have the data");
      return (this.customers = data);
    }
  },
  created() {
    this.getCustomersData();
  },
  computed: {
    // 计算属性的超强过滤功能
    filteredBy() {
      // 传参
      const { customersData, keywords } = this;
      let search = keywords.toLowerCase();

      return customersData.filter(customer => {
        if (!customer.email) return;
        if (!customer.company) return;
        if (!customer.person) return;
        if (!customer.country) return;
        return (
          customer.email.toLowerCase().includes(search) ||
          customer.company.toLowerCase().includes(search) ||
          customer.person.toLowerCase().includes(search) ||
          customer.country.toLowerCase().includes(search)
        );
      });
    }
  }
};
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
.customer_add {
  color: #fff;
}
</style>
