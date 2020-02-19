<template>
  <div class="customer_show container mt-3">
    <router-link to="/customer">Back</router-link>
    <div class="card">
      <div class="card-header">
        <span v-if="userData.rank">Rank: {{ userData.rank }}</span>
        <span class="ml-2">Customer {{ $route.params.id }} details</span>
        <button
          class="btn btn-danger btn-sm float-right"
          @click="deleteCustomerData($route.params.id)"
        >
          Delete
        </button>

      </div>
      <div class="card-body" v-if="userData.lead">
        <h5 class="card-title">
          <i class="iconfont icon-survey mr-2"></i>What is intersted in
        </h5>
        <p class="card-text">
          {{ userData.lead }}
        </p>
      </div>
      <div class="card-body" v-if="userData.memo">
        <h5 class="card-title">
          <i class="iconfont icon-form mr-2"></i>Follow up
        </h5>
        <p class="card-text">
          {{ userData.memo }}
        </p>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <i class="iconfont icon-account mr-2"></i>Customer's contact
          information
        </h5>
        <p class="card-text" v-if="userData.person">
          Name: {{ userData.person }}
        </p>
        <p class="card-text" v-if="userData.email">
          Email: {{ userData.email }}
        </p>
        <p class="card-text" v-if="userData.mobile">
          Mobile: {{ userData.mobile }}
        </p>
        <p class="card-text" v-if="userData.qq">QQ: {{ userData.qq }}</p>
        <p class="card-text" v-if="userData.skype">
          Skype: {{ userData.skype }}
        </p>
        <p class="card-text" v-if="userData.wechat">
          Wechat: {{ userData.wechat }}
        </p>
        <p class="card-text" v-if="userData.whatsapp">
          Whatsapp: {{ userData.whatsapp }}
        </p>
        <p class="card-text" v-if="userData.tel">
          Tel: {{ userData.tel }}
        </p>
        <p class="card-text" v-if="userData.fax">
          Fax: {{ userData.fax }}
        </p>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <i class="iconfont icon-logistic mr-2"></i> Company information
        </h5>
        <p class="card-text" v-if="userData.position">
          Position: {{ userData.position }}
        </p>
        <p class="card-text" v-if="userData.company">
          Company: {{ userData.company }}
        </p>
        <p class="card-text" v-if="userData.address">
          Address: {{ userData.address }}
        </p>
        <p class="card-text" v-if="userData.website">
          Website: {{ userData.website }}
        </p>
        <p class="card-text" v-if="userData.country">
          Country: {{ userData.country }}
        </p>
      </div>

      <div class="card-footer">
        <span>更新于: {{ userData.updated_at }}</span>
        <span class="ml-1">创建于: {{ userData.date }}</span>
         <router-link
      class="btn btn-primary float-right"
      :to="{name: 'CustomerEdit', params: { id: $route.params.id }}"
      >Edit</router-link
    >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CustomerShow",
  data() {
    return {
      userData: ""
    };
  },
  methods: {
    getCustomerDetail() {
      axios.get(this.GLOBAL.baseUrl + "/customer/" + this.$route.params.id)
      .then(res => {
        return (this.userData = res.data);
      })
    },
    deleteCustomerData(id) {
      if (window.confirm(`删除客户${this.$route.params.id}资料么?`)) {
        axios
          .delete(this.GLOBAL.baseUrl + "/customer/" + id)
          .then(res => {
            if (res.status == 200) {
              this.$router.push({ name: "Customer" });
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  },
  created() {
    this.getCustomerDetail();
  }
};
</script>
<style></style>
