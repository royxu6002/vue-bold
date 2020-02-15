<template>
  <div class="customer_show container mt-3">
    <router-link to="/customer">Back</router-link>
    <div class="card">
      <div class="card-header">
        <span v-if="userData[0].rank">Rank: {{ userData[0].rank }}</span>
        <span class="ml-2">Customer {{ $route.params.id }} details</span>
        <button
          class="btn btn-danger btn-sm float-right"
          @click="deleteCustomerData($route.params.id)"
        >
          Delete
        </button>

      </div>
      <div class="card-body" v-if="userData[0].lead">
        <h5 class="card-title">
          <i class="iconfont icon-survey mr-2"></i>What is intersted in
        </h5>
        <p class="card-text">
          {{ userData[0].lead }}
        </p>
      </div>
      <div class="card-body" v-if="userData[0].memo">
        <h5 class="card-title">
          <i class="iconfont icon-form mr-2"></i>Follow up
        </h5>
        <p class="card-text">
          {{ userData[0].memo }}
        </p>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <i class="iconfont icon-account mr-2"></i>Customer's contact
          information
        </h5>
        <p class="card-text" v-if="userData[0].person">
          Name: {{ userData[0].person }}
        </p>
        <p class="card-text" v-if="userData[0].email">
          Email: {{ userData[0].email }}
        </p>
        <p class="card-text" v-if="userData[0].mobile">
          Mobile: {{ userData[0].mobile }}
        </p>
        <p class="card-text" v-if="userData[0].qq">QQ: {{ userData[0].qq }}</p>
        <p class="card-text" v-if="userData[0].skype">
          Skype: {{ userData[0].skype }}
        </p>
        <p class="card-text" v-if="userData[0].wechat">
          Wechat: {{ userData[0].wechat }}
        </p>
        <p class="card-text" v-if="userData[0].whatsapp">
          Whatsapp: {{ userData[0].whatsapp }}
        </p>
        <p class="card-text" v-if="userData[0].tel">
          Tel: {{ userData[0].tel }}
        </p>
        <p class="card-text" v-if="userData[0].fax">
          Fax: {{ userData[0].fax }}
        </p>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <i class="iconfont icon-logistic mr-2"></i> Company information
        </h5>
        <p class="card-text" v-if="userData[0].position">
          Position: {{ userData[0].position }}
        </p>
        <p class="card-text" v-if="userData[0].company">
          Company: {{ userData[0].company }}
        </p>
        <p class="card-text" v-if="userData[0].address">
          Address: {{ userData[0].address }}
        </p>
        <p class="card-text" v-if="userData[0].website">
          Website: {{ userData[0].website }}
        </p>
        <p class="card-text" v-if="userData[0].country">
          Country: {{ userData[0].country }}
        </p>
      </div>

      <div class="card-footer">
        <span>更新于: {{ userData[0].updated_at }}</span>
        <span class="ml-1">创建于: {{ userData[0].date }}</span>
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
      axios.get(this.GLOBAL.baseUrl + "/customer/" + this.$route.params.id).then(res => {
        return (this.userData = res.data);
      });
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
