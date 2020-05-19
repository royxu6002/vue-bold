<template>
  <div class="invoice-create container">
    <div style="text-align: center">
      Edit Invoice
    </div>
    
    <div class="row invoice-create-header mt-3 mb-3">
      <div>
        <small>NO. #</small>
        <input
          type="text"
          placeholder="Auto"
          readonly
          disabled="disabled"
          style="width:100px; border: 1px solid #eee; margin-left: 5px;"
          class="mr-3"
        />
        <small>Type</small>
        <select class="ml-2 mr-3 inline-control" v-model="invoiceData.type">
          <option value="">Please select</option>
          <option value="invoice">Invoice</option>
          <option value="quotation">Quotation</option>
        </select>

        <small>Currency</small>
        <select class="ml-2 inline-control" v-model="invoiceData.currency_type" required>
          <option value="$">US$</option>
          <option value="¥">CN¥</option>
          <option value="€">EU€</option>
        </select>
      </div>
      <div>
        <small>Date Issued:</small>
        <input
          type="date"
          class="ml-2 mr-3"
          v-model="invoiceData.invoice_issued_date"
          required="required"
        />
        <small>Date Due:</small>
        <input
          type="Date"
          class="ml-2"
          v-model="invoiceData.invoice_due_date"
          required="required"
        />
      </div>
    </div>
    <hr />
    <div class="mt-3 row">
      <div class="col-4">
        <small>Bill to:</small>
        <select
          required="required"
          class="form-control"
          v-model="invoiceData.client_id"
        >
          <option value="">
            + Add new customers
          </option>
          <option
            v-for="customer in customersData"
            :value="customer.id"
            :key="customer.id"
          >
            <span v-if="customer.company">{{ customer.company }}</span>
          </option>
        </select>
      </div>
      <div class="col-4 from-group">
        <small>Ship from</small>
        <div>
          <input
            type="text"
            class="form-control"
            v-model="invoiceData.ship_from"
          />
        </div>
      </div>
      <div class="col-4">
        <small>Ship to</small>
        <div>
          <input
            type="text"
            class="form-control"
            v-model="invoiceData.ship_to"
          />
        </div>
      </div>
      <div class="col-4 from-group">
        <small>Deadline</small>
        <div>
          <input
            type="date"
            class="form-control"
            v-model="invoiceData.deadline"
          />
        </div>
      </div>
      <div class="col-4">
        <small>Price term</small>
        <div>
          <input
            type="text"
            class="form-control"
            v-model="invoiceData.price_term"
          />
        </div>
      </div>
      <div class="col-4">
        <small>Payment term</small>
        <div>
          <input
            type="text"
            class="form-control"
            v-model="invoiceData.payment_term"
          />
        </div>
      </div>
    </div>
    <hr />
    <div
      class="invoice-table"
      v-for="(orderProduct, index) in invoiceData.products"
      :key="index"
    >
      <div class="column item">
        <small>Item</small>
        <select class="form-control" v-model="orderProduct.order_info.product_id">
          <option disabled value="">请选择</option>
          <option
            v-for="product in productsData"
            :value="product.id"
            :key="product.id"
            >{{ product.product_name }}</option
          >
        </select>
      </div>

      <div class="column custom">
        <small>Custom</small>
        <textarea v-model="orderProduct.order_info.product_custom" placeholder="Custom product"
          class="form-control"></textarea>
      </div>

      <div class="column money">
        <small>currency</small>
        <select class="form-control" v-model="orderProduct.order_info.currency" required>
          <option value="US$" selected>US$</option>
          <option value="EU€">EU€</option>
          <option value="CN¥">CN¥</option>
          >
        </select>
      </div>

      <div class="column cost">
        <small>cost</small>
        <input
          type="number"
          class="form-control"
          v-model="orderProduct.order_info.product_cost"
        />
      </div>

      <div class="column quantity">
        <small>Qty</small>
        <input
          type="number"
          class="form-control"
          v-model="orderProduct.order_info.product_quantity"
        />
      </div>

      <div class="qty-per-carton">
        <small>Qty/Ctn</small>
        <select
          class="form-control"
          @click="getPackagesData(orderProduct.order_info.product_id)"
          v-model="orderProduct.order_info.product_number_per_carton"
          @blur="setPackageData(orderProduct)"
        >
          <option value="">Pieces</option>
          <option
            v-for="packageData in packagesData"
            :value="packageData.product_package_item_num"
            :key="packageData.id"
          >
            art.{{ packageData.product_model }}-{{
              packageData.product_package_item_num
            }}pcs/ctn
          </option>
        </select>
      </div>

      <div class="column-right price">
        <small>Price</small>
        <div>
          <span>{{ orderProduct.order_info.currency }}</span>
          {{multiply(orderProduct.order_info.product_cost, orderProduct.order_info.product_quantity) || ""}}
        </div>
      </div>

      <div class="column">
        <a class="btn" @click="deleteNewItem(index)">x</a>
        <div class="ml-2">
          <i class="iconfont icon-edit"></i>
        </div>
      </div>

      <div>
        <small>Shipping Mark</small>
        <textarea
          rows="1"
          v-model="orderProduct.order_info.shipping_mark"
          placeholder="Shipping mark"
          class="form-control"
        ></textarea>
      </div>
      <div>
        <small>Cartons</small>
        <input
          type="text"
          v-model="orderProduct.order_info.cartons"
          readonly
          class="form-control"
        />
      </div>
      <div>
        <small>CBM</small>
        <input
          type="text"
          v-model="orderProduct.order_info.cbm"
          readonly
          class="form-control"
        />
      </div>
      <div>
        <small>NW</small>
        <input
          type="text"
          v-model="orderProduct.order_info.net_weight"
          readonly
          class="form-control"
        />
      </div>
      <div>
        <small>GW</small>
        <input
          type="text"
          v-model="orderProduct.order_info.gross_weight"
          readonly
          class="form-control"
        />
      </div>
    </div>

    <div class="new-item-button mt-3">
      <a class="btn" @click="addNewItem()">+</a>
    </div>

    <div class="invoice-total-wrapper float-right">
      <div class="wrap">
        <div class="wrap-item">
          <span>Subtotal</span>
          <span>{{ invoiceData.currency_type }} {{ subtotal }}</span>
        </div>
        <div class="wrap-item">
          <span>Discount</span>
          <span>
            {{ invoiceData.currency_type }}<input
              v-model="invoiceData.invoice_discount"
              class="ml-1 noborder-input"
              @input="changeWidth('discountInput')"
              id="discountInput"
            />
          </span>
        </div>
        <div class="wrap-item">
          <span>Shipping cost</span>
          <span>
          {{ invoiceData.currency_type }}
            <input
              v-model="invoiceData.invoice_shipment_cost"
              class="ml-1 noborder-input"
              @input="changeWidth('shippingCostInput')"
              id="shippingCostInput"
            />
          </span>
        </div>
        <hr />
        <div class="wrap-item">
          <span>Invoice Total</span>
          <span>{{ invoiceData.currency_type }} {{ total }} </span>
        </div>

        <div class="float-right mt-3">
          <button class="action-button" @click="updateInvoice">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceEdit",
  data() {
    return {
      invoiceData: {},
      customersData: [],
      productsData: [],
      // 根据选择到产品 ID 拿到的产品一对多模型关联的包装数据
      packagesData: [],
      pd: ""
    };
  },
  methods: {
    getInvoiceData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/invoices/" + this.$route.params.id)
        .then(res => (this.invoiceData = res.data[0]))
        .catch(err => alert(err));
    },
    getCustomersData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/client")
        .then(res => {
          if (res.status == 200) {
            this.customersData = res.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    /**
     * getProductsData, getPackagesData 可以考虑合并为一个接口.
     */
    getProductsData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/products")
        .then(res => {
          if (res.status == 200) {
            this.productsData = res.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    // 接口拿到 productPackages 总数据.
    getPackagesData(id) {
      if (!id) return alert("please select a product");
      this.axios
        .get(this.GLOBAL.baseUrl + "/packages/" + id)
        .then(res => {
          if (res.status == 200) {
            this.packagesData = res.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    // input 失去焦点, 拿到具体的包装数据
    setPackageData(orderProduct) {
      let pd = this.packagesData.filter(
        p =>
          p.product_package_item_num === orderProduct.order_info.product_number_per_carton
      );
      orderProduct.order_info.cartons =
        orderProduct.order_info.product_quantity / orderProduct.order_info.product_number_per_carton;
      orderProduct.order_info.cbm = orderProduct.order_info.cartons * pd[0].product_package_cbm;
      orderProduct.order_info.net_weight =
        orderProduct.order_info.cartons * pd[0].product_package_net_weight;
      orderProduct.order_info.gross_weight =
        orderProduct.order_info.cartons * pd[0].product_package_gross_weight;
    },
    addNewItem() {
      this.invoiceData.products.push({
        order_info: {
          product_id: "",
          product_custom: "",
          currency: "",
          product_cost: "",
          product_quantity: "",
          product_number_per_carton: "",
          shipping_mark: "",
          cbm: "",
          cartons: "",
          net_weight: "",
          gross_weight: ""
        }
      });
    },
    deleteNewItem(index) {
      if (this.invoiceData.products.length <= 1)
        return alert("there should be one item need to been added");
      this.invoiceData.products.splice(index, 1);
    },
    changeWidth(nameInput) {
      let input = document.getElementById(nameInput);
      const l = input.value.length;
      input.style.width = l * 10 + "px";
    },
    transferTotal() {
      this.invoiceData.invoice_total = this.total;
    },
    // 控制器接口还没有写, 未测试;
    updateInvoice() {
      this.transferTotal();
      this.axios
        .put(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id, this.qs.stringify(this.invoiceData))
        .then(res => {
          if (res.status == 200) {
            alert(res.data.msg);
            this.$router.push("/invoice");
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  created() {
    this.getInvoiceData();
    this.getProductsData();
    this.getCustomersData();
  },
  computed: {
    multiply() {
      return (a,b) => {
        let x = new this.BIGNUMBER(a);
        return x.multipliedBy(b);
      }
    },
    subtotal() {
      let price = 0;
      this.invoiceData.products.forEach(orderProduct => {
        let x = new this.BIGNUMBER(orderProduct.order_info.product_cost);
        price += Number(x.multipliedBy(orderProduct.order_info.product_quantity));
      });
      return price;
    },
    total() {
      return (
        Number(this.subtotal) +
        Number(this.invoiceData.invoice_discount) +
        Number(this.invoiceData.invoice_shipment_cost)
      );
    }
  }
};
</script>
<style scoped>
.invoice-create-header {
  select {
    width: 100%;
  }
  .input {
    margin-left: 10px;
    size: 0.5em;
  }
  display: flex;
  justify-content: space-between;
}
.input-dropdown {
  width: 40%;
}
.invoice-table {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input {
    width: 100%;
  }
  input[readonly] {
    opacity: 0.5;
  }
  border: 1px solid #eeeeee;
  margin: 10px;
  padding: 10px;
  .item {
    width: 48%;
  }
  .money {
    width: 4%;
  }
  .cost {
    width: 8%;
  }
  .quantity {
    width: 8%;
  }
  .qty-per-carton {
    width: 16%;
  }
  .price {
    width: 10%;
  }
  .column-right {
    text-align: right;
  }
}

.wrap .wrap-item {
  display: flex;
  width: 300px;
  justify-content: space-between;
}

.action-button {
  border-radius: 0.25em;
  border: 1px solid #eee;
  padding: 10px;
  background-color: #2d2a2a;
  color: #fff;
  line-height: 1.2em;
}
.noborder-input {
  text-align: right;
  border: none;
  width: auto;
}
</style>
