<template>
  <div class="customers mt-3 container-fluid">
    <Nav />
    <div class="customers_header">
      <span class="mr-2" @click="showAddGroupInput">+group</span>
      <small @click="getCustomersData">All</small>
      <small
        class="mr-2"
        v-for="(data, index) in groupData"
        :class="{ active: className == data.name }"
        :key="index"
        @click="getGroupedCustomers(data, $event)"
      >
        {{ data.name }}
      </small>
      <input type="text" v-model="keywords" @keyup="inputKeywords(keywords)">
      <router-link :to="{ name: 'CustomerCreate' }">
        <span class="btn btn-default customer_add">
          <i class="iconfont icon-add-account mr-2 icon-smallfix"></i>
        </span>
      </router-link>
    </div>

    <div v-if="isAddGroupInputShow" style="background: yellowgreen">
      <form @submit.prevent="sendGroupData">
        <input v-model="group.groupname" placeholder="Type into group name" />
        <button type="submit">
          <i class="iconfont icon-smallfix icon-icon_tianjia"></i>
        </button>
      </form>
    </div>
    <div class="pagination-container container">
        <span>Total {{total}} results</span>
        <span @click="gotoPrev()">Prev</span>
        <span>Current on {{$route.query.page}} of {{last_page}}</span>
        <span @click="gotoNext()">Next</span>
    </div>
    <div class="customers_body">
      <table class="table table-hover table-striped">
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Customer",
  data() {
    return {
      isAddGroupInputShow: false,
      customersData: [],
      keywords: '',
      group: {
        groupname: "",
      },
      groupData: "",
      className: "",
      // 加入前端分页功能,
      per_page: 15,
      page: 1,
    };
  },
  methods: {
    ...mapActions('customers', ['inputKeywords']),
    getCustomersData() {
      this.inputKeywords('');
      this.keywords = '';
    },
    goTo(id) {
      this.$router.replace({ path: "/customer", params: { id: id } });
    },
    search(s) {
      let sear = s.trim().toLowerCase();
      if (!sear) return alert("please type something");

      // 数据中有空字符串, 导致过滤有困难
      let data = this.customersData.filter((customer) => {
        if (!customer.email) return;
      });
      if (data.length == 0) return alert("we dont have the data");
      return (this.customers = data);
    },
    showAddGroupInput() {
      this.isAddGroupInputShow = !this.isAddGroupInputShow;
    },
    sendGroupData() {
      // data() group.groupname group对象, 不能直接传输数据 groupname 给后台;
      this.axios
        .post(this.GLOBAL.baseUrl + "/group", this.qs.stringify(this.group))
        .then((res) => {
          alert(res.data.msg);
          this.group.groupname = "";
          this.getGroupData();
        })
        .catch((err) => alert(err));
    },
    getGroupData() {
      let { axios, GLOBAL } = this;
      axios
        .get(GLOBAL.baseUrl + "/group")
        .then((res) => (this.groupData = res.data))
        .catch((err) => alert(err));
    },
    getGroupedCustomers(data) {
      this.axios
        .get(this.GLOBAL.baseUrl + "/group/" + data.id + "/customers")
        .then((res) => {
          this.customersData = res.data;
          this.className = data.name;
        })
        .catch((err) => alert(err));
    },
    gotoNext() {
      if(this.$route.query.page == this.last_page) {
        return;
      }
      this.$router.push({name: 'Customer', query: {page: Number(this.$route.query.page) + 1}});
    },
    gotoPrev() {
      if(this.$route.query.page <=1 ) return;
      this.$router.push({name: 'Customer', query: {page: Number(this.$route.query.page) - 1}});
    },
  },
  created() {
    this.getGroupData();
    this.$store.dispatch('customers/get');
  },
  computed: {
    ...mapGetters('customers', ['filteredCustomers']),
    total() {
      if(this.filteredCustomers) return this.filteredCustomers.length;
      return '1';
    },
    filteredBy() {
        let page = this.$route.query.page;
        return  this.filteredCustomers.filter((customer, index) => {
          return index < this.per_page * page && index >= this.per_page * (page -1)
        });
    },
    last_page() {
      return Math.ceil(this.total/this.per_page);
    }
  },
  watch: {
     keywords(value) {
       if(value) this.$route.query.page = 1;
     }
  }
};
</script>
<style scoped>
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
.active {
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 5px;
  background-color: blue;
}
.pagination-container {
  display: flex;
  justify-content: space-between;
}
</style>
