<template>
  <div class="customer_show container mt-3">
    <div class="customer_show_header">
      <router-link to="/customer" class="m">Back</router-link>
      <div>
        <small
          v-for="(data, index) in groupData"
          :key="index"
          class="mr-2"
          :class="isChecked(data.id)"
          @click="switchLabel(data,data.id)"
        >
          {{data.name}}
        </small>
      </div>
    </div>
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
      userData: "",
      // 取到全部的 group 标签
      groupData: "",
      // 取到客户自己的 group 标签
      customerGroupData: "",
      btnChecked: true
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
    },
    getGroupData() {
      this.axios.get(this.GLOBAL.baseUrl+"/group")
      .then(res => this.groupData = res.data)
      .catch(err => alert(err))
    },
    getCustomerGroupData() {
      this.axios.get(this.GLOBAL.baseUrl+"/customer/"+this.$route.params.id+"/groupids")
      .then(res => this.customerGroupData = res.data)
      .catch(err => alert(err))
    },
    switchLabel(data, id) {
      let result = this.customerGroupData.includes(id);
      if(result) {
        //表示客户已经有该标签了, 点击是发送 delete 请求, 去掉该标签;
        window.confirm(`确认删除客户拥有的 ${data.name} 标签么?`)
        this.axios.delete(this.GLOBAL.baseUrl+"/customer/"+this.$route.params.id+"/bleach/"+id)
        .then(res => { 
          alert(res.data.msg);
          // es6 找到 id 的 index, 再使用 spice 方法;
          let index =  this.customerGroupData.findIndex(n => n == id);
          window.console.log(index);
          this.customerGroupData.splice(index, 1);
        })
        .catch(err => alert(err))
      } else {
        // 否则发送的 post 请求, 添加该标签;
        this.axios.post(this.GLOBAL.baseUrl+"/customer/"+this.$route.params.id+"/dye/"+id)
        .then(res => {
          alert(res.data.msg);
          this.customerGroupData.push(id);
        })
        .catch(err => alert(err))
      }
    }
  },
  created() {
    this.getCustomerDetail();
    this.getGroupData();
    this.getCustomerGroupData();
  },
  computed: {
    isChecked() {
      return (id) => {
        if (this.customerGroupData.includes(id)) return "btn-primary";
        return "btn-default";
      }
    }
  }
};
</script>
<style scoped>
.customer_show_header{
  display: flex;
  justify-content: space-between;
}
.btn-primary{
  padding: 5px 5px;
  border-radius: 5px;
}
</style>
