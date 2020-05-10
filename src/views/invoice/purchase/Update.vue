<template>
  <div class="purchase-create-page container">
    <h4 class="mt-3">
      Purchase update page for Invoice #{{ $route.params.id }}
    </h4>
    <div>
      <form @submit.prevent="submitFormData()">
        <table class="table table-hover">
          <thead>
            <th>Invoice 信息</th>
            <th>Purchase 信息</th>
            <th>规格(定制)</th>
            <th>其他定制</th>
          </thead>
          <tbody>
            <tr v-for="(product, index) in invoiceData.products" :key="index">
              <td>
                  <div class="two-column">
                    <small>产品 ID: </small>
                    <span>{{ product.id }}</span>
                  </div>

                  <div class="two-column">
                    <small>品名: </small>
                    <span>{{ product.product_name }}</span>
                  </div>

                  <div class="two-column">
                    <small>定制: </small>
                    <span>
                      {{ product.order_info.product_custom}}
                    </span>
                  </div>

                  <div class="two-column">
                    <small>外销价: </small>
                    <span>
                      {{ product.order_info.currency}}{{ product.order_info.product_cost }}
                    </span>
                  </div>

                  
                  <div class="two-column">
                    <small>数量</small>
                    <span>{{ product.order_info.product_quantity }}PCS</span>
                  </div>

                  <div v-for="(supplier, ind) in product.suppliers"
                      :value="supplier.purchase_info.supplier_id" :key="ind">
                      <hr>
                      <div class="two-column">
                        <small>供应商 ID:</small>
                    <span>{{ supplier.id }}</span>
                      </div>
                      <div class="two-column">
                        <small>供应商名字: </small>
                        <span>{{ supplier.name }}</span>
                      </div>
                      <div class="two-column"><small>价格:</small><span>{{
                        supplier.purchase_info.price
                      }}</span></div>
                      <div class="two-column"><small>价格条款</small><span>{{ supplier.purchase_info.price_term }}</span></div>
                    
                  </div>
              </td>
              <td>
                <div class="two-column">
                  <small>产品 ID</small>
                  <input type="number" readonly placeholder="product_id" v-model="formWrap[index].product_id" />
                </div>
                <div class="two-column">
                  <small>采购价
                    <span v-if="formWrap[index].price_term == 'fob_usd'">$</span>
                    <span v-else>¥</span>
                  </small>
                  <input type="text" v-model="formWrap[index].price" value="product.product_price" required />
                </div>
                <div class="two-column">
                  <small>价格条款</small>
                  <select v-model="formWrap[index].price_term" required>
                    <option value="exw_no_tax">出厂不含税价</option>
                    <option value="exw_tax">出厂含税价</option>
                    <option value="cpt_no_tax">进仓不含税价</option>
                    <option value="cpt_tax">进仓含税价</option>
                    <option value="fob_rmb">FOB人民币价</option>
                    <option value="fob_usd">FOB美金价</option>
                  </select>
                </div>
                <div class="two-column">
                  <small>数量</small>
                  <input type="text" v-model="formWrap[index].quantity" required />
                </div>
                <div class="two-column">
                  <small>供应商</small>
                  <select v-model="formWrap[index].supplier_id" required>
                    <option
                      v-for="(supplier, ind) in product.suppliers"
                      :value="supplier.purchase_info.supplier_id"
                      :key="ind"
                    >
                      {{ supplier.id }} {{ supplier.name }}</option
                    >
                  </select>
                </div>
                <div><img :src="product.imgs[0]" alt="" width="200px"></div>
              </td>
              <td>
                <textarea rows="3" placeholder="定制" v-model="formWrap[index].custom_requirement" required></textarea>
              </td>
              <td>
                <textarea rows="3" placeholder="其他定制要求" v-model="formWrap[index].other_requirement"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="purchase-create-button">
          <button type="submit btn btn-primary">Update Purchase Order</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "PurchaseUpdate",
  data() {
    return {
      invoiceData: "",
      purchasesData: "",
      formWrap: []
    };
  },
  methods: {
    getInvoiceData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id)
        .then(res => {
          this.invoiceData = res.data;
          this.formWrap = res.data.purchase_info;
        })
        .catch(err => alert(err));
    },
    submitFormData() {
      this.axios.put(this.GLOBAL.baseUrl+"/invoice/"+this.$route.params.id+"/purchases", this.qs.stringify(this.formWrap))
      .then(res => {
        alert(res.data.msg);
        // window.console.log(res.data);
        this.$router.replace("/invoice");
      })
      .catch(err => { 
        alert(err);
        // window.console.log(err);
      })
    }
  },
  created() {
    this.getInvoiceData();
  }
};
</script>
<style scoped>
.purchase-create-button {
  display: flex;
  justify-content: space-between;
}
.purchase-create-page .two-column {
  display: flex;
  justify-content: space-between;
}
</style>
