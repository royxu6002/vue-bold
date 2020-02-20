<template>
  <div class="invoice-create container">
    <div style="text-align: center">
      Creeat Invoice
    </div>
    <div class="row invoice-create-header mt-3 mb-3">
      <div>
        <small>Invoice #</small>
        <input
          type="text"
          placeholder="Auto"
          readonly
          disabled="disabled"
          style="width:100px; border: 1px solid #eee; margin-left: 5px;"
        />
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
      v-for="(orderProduct, index) in invoiceData.order_info"
      :key="index"
    >
      <div class="column item">
        <small>Item</small>
        <select class="form-control" v-model="orderProduct.product_id">
          <option disabled value="">请选择</option>
          <option
            v-for="product in productsData"
            :value="product.id"
            :key="product.id"
            >{{ product.product_name }}</option
          >
        </select>
      </div>

      <div class="column cost">
        <small>cost</small>
        <input
          type="number"
          class="form-control"
          v-model="orderProduct.product_cost"
        />
      </div>

      <div class="column quantity">
        <small>Qty</small>
        <input
          type="number"
          class="form-control"
          v-model="orderProduct.product_quantity"
        />
      </div>

      <div class="qty-per-carton">
        <small>Qty/Ctn</small>
        <select
          class="form-control"
          @click="getPackagesData(orderProduct.product_id)"
          v-model="orderProduct.product_number_per_carton"
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
          <span>$</span>
          {{ orderProduct.product_cost * orderProduct.product_quantity || "" }}
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
          v-model="orderProduct.shipping_mark"
          placeholder="Shipping mark"
          class="form-control"
        ></textarea>
      </div>    
      <div>
        <small>Cartons</small>
        <input type="text" v-model="orderProduct.cartons" readonly class="form-control">
      </div>
      <div>
        <small>CBM</small>
        <input type="text" v-model="orderProduct.cbm" readonly class="form-control">
      </div>
      <div>
        <small>NW</small>
        <input type="text" v-model="orderProduct.net_weight" readonly class="form-control">
      </div>
      <div>
        <small>GW</small>
        <input type="text" v-model="orderProduct.gross_weight" readonly class="form-control">
      </div>
    </div>

    <div class="new-item-button mt-3">
      <a class="btn" @click="addNewItem()">+</a>
    </div>

    <div class="invoice-total-wrapper float-right">
      <div class="wrap">
        <div class="wrap-item">
          <span>Subtotal</span>
          <span>$ {{ subtotal }}</span>
        </div>
        <div class="wrap-item">
          <span>Discount</span>
          <span>
            $<input
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
            $
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
          <span> $ {{ total }} </span>
        </div>
        <div class="wrap-item">
          <span>Paid to date</span>
          <span> $ {{ paymentsData }} </span>
        </div>
        <div class="wrap-item">
          <span>Balance</span>
          <span>
            {{ balance }}
          </span>
        </div>

        <div class="float-right mt-3">
          <button class="action-button" @click="createInvoice">
            CREATE INVOICE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "InvoiceCreate",
  data() {
    return {
      invoiceData: {
        invoice_issued_date: "",
        invoice_due_date: "",
        client_id: "",
        ship_from: "",
        ship_to: "",
        deadline: "",
        price_term: "",
        payment_term: "",
        order_info: [
          {
            product_id: "",
            product_cost: "",
            product_quantity: "",
            product_number_per_carton: "",
            shipping_mark: "",
            cbm: "",
            cartons: "",
            net_weight: "",
            gross_weight: ""
          }
        ],
        invoice_discount: "",
        invoice_shipment_cost: "",
        invoice_total: ""
      },
      customersData: [],
      productsData: [],
      // 根据选择到产品 ID 拿到的产品一对多模型关联的包装数据
      packagesData: [],
      paymentsData: 0,
      pd: "",
    };
  },
  methods: {
    getCustomersData() {
      axios
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
    getProductsData() {
      axios
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
      axios
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
      let pd =  this.packagesData.filter(p => p.product_package_item_num === orderProduct.product_number_per_carton);
      orderProduct.cartons = orderProduct.product_quantity / orderProduct.product_number_per_carton;
      orderProduct.cbm = orderProduct.cartons * pd[0].product_package_cbm;
      orderProduct.net_weight = orderProduct.cartons * pd[0].product_package_net_weight;
      orderProduct.gross_weight =  orderProduct.cartons * pd[0].product_package_gross_weight;
    },
    addNewItem() {
      this.invoiceData.order_info.push({
        product_id: "",
        product_cost: "",
        product_quantity: "",
        product_number_per_carton: "",
        shipping_mark: "",
        cbm: "",
        cartons: "",
        net_weight: "",
        gross_weight: ""
      });
    },
    deleteNewItem(index) {
      if (this.invoiceData.order_info.length <= 1)
        return alert("there should be one item need to been added");
      this.invoiceData.order_info.splice(index, 1);
    },
    addShippingMark() {},
    changeWidth(nameInput) {
      let input = document.getElementById(nameInput);
      const l = input.value.length;
      input.style.width = l * 10 + "px";
    },
    transferTotal() {
      this.invoiceData.invoice_total = this.total;
    },
    createInvoice() {
      this.transferTotal();
      axios
        .post(this.GLOBAL.baseUrl + "/invoice", qs.stringify(this.invoiceData))
        .then(res => {
          window.console.log(res.data);
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
    this.getProductsData();
    this.getCustomersData();
  },
  computed: {
    subtotal() {
      let price = 0;
      this.invoiceData.order_info.forEach(orderProduct => {
        price += orderProduct.product_cost * orderProduct.product_quantity;
      });
      return price;
    },
    total() {
      return (
        Number(this.subtotal) +
        Number(this.invoiceData.invoice_discount) +
        Number(this.invoiceData.invoice_shipment_cost)
      );
    },
    balance() {
      return this.total - this.paymentsData;
    },
    filteredPackagesData() {
     return this.packagesData.filter(p => p.product_package_item_num === 10);
    }
  }
};
</script>
<style lang="scss">
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
  input[readonly]{
    // background-color: #e9ecef;
    opacity: 0.5;
  }
  border: 1px solid #eee;
  margin: 10px;
  padding: 10px;
  .item {
    width: 48%;
  }
  .cost {
    width: 10%;
  }
  .quantity {
    width: 10%;
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
.wrap {
  .wrap-item {
    display: flex;
    width: 300px;
    justify-content: space-between;
  }
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
