<template>
  <div class="supplier-show-page container mt-3">
    <span class="mr-3">Supplier show</span>
    <span>
      <router-link
        :to="{ name: 'SupplierEdit', params: { id: this.$route.params.id } }"
        >Edit</router-link
      >
    </span>
    <hr />
    <div class="col-lg-6 col-md-12 col-sm-12">
      <div>ID:{{ supplierData.id }}</div>
      <div>Name:{{ supplierData.name }}</div>
      <div>Address:{{ supplierData.address }}</div>
      <div>License:{{ supplierData.business_license }}</div>
      <div>Factory Rate:{{ supplierData.factory_tax_rate }}</div>
      <div>Owner:{{ supplierData.legal_person }}</div>
      <div>Tel:{{ supplierData.tel }}</div>
      <div>Fax:{{ supplierData.fax }}</div>
      <div>Contact:{{ supplierData.contact_person }}</div>
      <div>Mobile:{{ supplierData.mobile }}</div>
      <div>
        Other contact:{{ JSON.parse(supplierData.alternative_contact) }}
      </div>
    </div>
    <hr />
    <div>Relate product infomation</div>
    <div style="font-weight: 300">
      <span
        v-for="(pro, index) in productsData"
        :key="index"
        @click="selectId(pro.id)"
        
      >
        <img
          :src="pro.imgs[0]"
          :class="{selected: isDyed(pro.id)}"
          width="100px"
          style="border: 1px solid #ccc; margin: 20px"
        />
      </span>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <small class="mr-3">ID</small
        ><input type="text" v-model="productDeal.product_id" />
      </div>
      <div>
        <small class="mr-3">Price term</small>
        <select v-model="productDeal.price_term">
          <option value="exw_no_tax">出厂不含税价</option>
          <option value="exw_tax">出厂含税价</option>
          <option value="cpt_no_tax">进仓不含税价</option>
          <option value="cpt_tax">进仓含税价</option>
          <option value="fob_rmb">FOB 人民币价</option>
          <option value="fob_usd">FOB 美金价</option>
        </select>
      </div>
      <div>
        <small class="mr-3">Price</small
        ><input type="text" v-model="productDeal.price" />
      </div>
    </div>
    <button @click="submitData()" class="mt-3">Submit</button>
  </div>
</template>
<script>
export default {
  name: "SupplierShow",
  data() {
    return {
      supplierData: "",
      productsData: "",
      productDeal: {
        product_id: "",
        price: "",
        price_term: "exw_no_tax"
      },
      dyeProductsIds: ""
    };
  },
  methods: {
    getSupplierData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/supplier/" + this.$route.params.id)
        .then(res => (this.supplierData = res.data))
        .catch(err => alert(err));
    },
    getProductsData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/products")
        .then(res => (this.productsData = res.data))
        .catch(err => alert(err));
    },
    getDyeProductsIds() {
        this.axios.get(this.GLOBAL.baseUrl+"/supplier/"+this.$route.params.id+"/productids")
        .then(res => (this.dyeProductsIds = res.data))
        .catch(err => alert(err))
    },
    selectId(i) {
      let result = this.dyeProductsIds.includes(i);
      if(result) {
        window.confirm(`Are you sure to bleach product ${i}`);
        this.axios.delete(this.GLOBAL.baseUrl+"/supplier/"+this.$route.params.id+"/bleach/"+i)
        .then(res => alert(res.data.msg))
        .catch(err => alert(err))
        this.$router.push("/supplier/index");
      } else {
        this.productDeal.product_id = i;
      }
    },
    submitData() {
      this.axios
        .post(
          this.GLOBAL.baseUrl + "/supplier/" + this.$route.params.id + "/dye",
          this.qs.stringify(this.productDeal)
        )
        .then(res => {
          window.console.log(res.data);
          alert(res.data.msg);
          this.$router.push("/supplier/index")
        })
        .catch(err => {
          window.console.log(err);
          alert(err);
        });
    }
  },
  created() {
    this.getSupplierData();
    this.getProductsData();
    this.getDyeProductsIds();
  },
  computed: {
    isDyed() {
      return (id) => {
        let res = this.dyeProductsIds.includes(id)
        if(res) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
</script>
<style scoped>
.selected {
  border-radius: 15px;
  border-color: red !important;
}
</style>
