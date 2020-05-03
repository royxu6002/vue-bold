<template>
  <div class="purchase-create-page container">
    <h4 class="mt-3">
      Purchase order create page for Invoice #{{ $route.params.id }}
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
                  <div class="two-column">
                    <button @click="inputDefaultInfo(index, product)">输入默认信息</button>
                <button @click="outputDefaultInfo(index, product)">清除默认信息</button>
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
          <button type="submit btn btn-primary">Create Purchase Order</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "PurchaseCreate",
  data() {
    return {
      invoiceData: "",
      multipyFormWrap: [],
      formWrap: []
    };
  },
  methods: {
    getInvoiceData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id)
        .then(res => {
          this.invoiceData = res.data;
          this.multipyFormWrap = this.invoiceData.products.length;
          for (let i = 0; i < this.multipyFormWrap; i++) {
            this.formWrap.push({
              product_id: this.invoiceData.products[i].id,
              supplier_id: "",
              price: "",
              price_term: "",
              quantity: "",
              custom_requirement: "",
              other_requirement: ""
            });
          }
        })
        .catch(err => alert(err));
    },
    inputDefaultInfo(i, p) {
      if (p.suppliers.length ==1) {
        this.formWrap[i].supplier_id = p.suppliers[0].id;
        this.formWrap[i].price = p.suppliers[0].purchase_info.price;
        this.formWrap[i].price_term = p.suppliers[0].purchase_info.price_term;
      };
      this.formWrap[i].quantity = p.order_info.product_quantity;
    },
    outputDefaultInfo(i, p) {
      if (p.suppliers.length ==1) {
        this.formWrap[i].price = '';
        this.formWrap[i].price_term = '';
      };
      this.formWrap[i].quantity = '';
    },
    submitFormData() {
      // let formData = new FormData();
      // formData.append('formWrap', JSON.stringify(this.formWrap));
      // let config = {
      //           headers: {'Content-Type': 'application/json'}
      //       };
      this.axios.post(this.GLOBAL.baseUrl+"/invoice/"+this.$route.params.id+"/purchases", this.qs.stringify(this.formWrap))
      .then(res => {
        alert(res.data.msg);
        // window.console.log(res.data);
        this.$router.replace("/invoice");
      })
      .catch(err => { 
        alert(err);
        window.console.log(err);
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
