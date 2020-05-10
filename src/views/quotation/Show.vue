<template>
  <div class="invoice_create container mt-3">
    <div class="invoice-brief">
      <div class="left">
        <small>Quotation #: {{ invoiceData.id }}</small>
        <div><small>Date issued: {{ invoiceData.issued_date }}</small></div>
        <div><small>Expiry Date: {{ invoiceData.due_date }}</small></div>
      </div>
      <div class="right">
        <div class="invoice-value">QUOTATION</div>
      </div>
    </div>
    <hr>
    <div class="invoice-header">
      <div class="invoice-header-left">
        <small>TO</small>
        <h6 class="mt-2">{{ invoiceData.client.company }}</h6>
        <div>{{ invoiceData.client.address }}</div>
        <div>{{ invoiceData.client.tel }}</div>
        <div>{{ invoiceData.client.email }}</div>
      </div>
      <div class="invoice-header-right">
        <small>FROM</small>
        <h6 class="mt-2">{{ BILLFROM.company }}</h6>
        <div class="align-right">
          {{ BILLFROM.address }}
        </div>
        <div>{{ BILLFROM.phone }}</div>
        <div>{{ BILLFROM.email }}</div>
      </div>
    </div>

    <div class="row invoice-table mt-3">
      <table
        valign="top"
        cellspacing="10px 0"
        cellpadding="10px 0"
        width="100%"
        style="border-collapse:collapse"
      >
        <tr style="border-bottom: 1px solid #171218">
          <th>
            ART.NO.
          </th>
          <th>IMAGE</th>
          <th style="width: 40%">
            DESCRIPTION
          </th>
          <th>COST</th>
          <th>QTY</th>
          <th class="th-right">PRICE</th>
        </tr>
        <tr
          style="border-bottom: 1px solid #ccc"
          v-for="(product, index) in invoiceData.products"
          :key="index"
        >
          <td>
            {{ product.product_name }}
            <div>{{product.order_info.product_custom}}</div>
          </td>
          <td>
            <img :src="product.imgs[0]" alt="" />
          </td>
          <td>
            <span v-html="product.product_brief_intro"></span>
          </td>
          <td>{{product.order_info.currency}}{{ product.order_info.product_cost }}</td>
          <td>{{ product.order_info.product_quantity }}</td>
          <td align="right">
            {{product.order_info.currency}}{{
              product.order_info.product_cost * 1000 *
                product.order_info.product_quantity/1000
            }}
          </td>
        </tr>

        <tr style="font-weight: 500">
          <td colspan="3" rowspan="6"></td>
          <td colspan="2" align="left">Subtotal</td>
          <td align="right">{{invoiceData.currency_type}}{{ subtotal }}</td>
        </tr>
        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.shipment_cost"
        >
          <td colspan="2" align="left">
            TNT Shipping Cost
          </td>
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.shipment_cost }}</td>
        </tr>
        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.discount"
        >
          <td colspan="2" align="left">
            Discount
          </td>
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.discount }}</td>
        </tr>
        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="2" align="left">
            Total
          </td>
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.total }}</td>
        </tr>
      </table>
    </div>
    <div class="invoice-terms mt-3">
      <table align="center" cellpadding="10px">
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF PACKING:</td>
          <td colspan="3" valign="top">
            <div v-for="(product, index) in invoiceData.products" :key="index">
              <div>
                ART. {{ product.product_name }} TO BE PACKED IN CARTONS OF
                {{ product.order_info.product_number_per_carton }}PCS EACH ONLY,
                SUBTOTAL
                {{ Number(product.order_info.cartons) }}
                CARTONS.
              </div>
              <div>SHIPPING MARK: {{ product.order_info.shipping_mark }}</div>
            </div>
            <div>
              TOTAL {{ cartons }} CARTONS, {{ cbm }} CUBIC METERS,
              {{ gross }} KILOGRAMMES.
            </div>
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF SHIPMENT:</td>
          <td colspan="3" valign="top">
            FROM: {{ invoiceData.from }}<br />
            TO: {{ invoiceData.to }}<br />
            TO BE EFFECTED BEFORE {{ invoiceData.deadline }} <br />WITH PARTIAL
            SHIPMENTS AND TRANSSHIPMENT NOT ALLOWED
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">DOCUMENTS:</td>
          <td colspan="3" valign="top">
            DIGITAL COMMERCIAL INVOICE AND PACKING LIST ORIGINAL BILL OF LADING
            OR TELEX-RELEASED B/L COPIES
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF PAYMENT:</td>
          <td colspan="3" valign="top">
            PRICE TERMS: {{ invoiceData.price_term }}, CHINA<br />
            PAYMENT TERMS: {{ invoiceData.payment_term }}. <br />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuotationShow",
  data() {
    return {
      invoiceData: {}
    };
  },
  methods: {
    getInvoiceData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id)
        .then(res => {
          this.invoiceData = res.data;
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  created() {
    this.getInvoiceData();
  },
  computed: {
    subtotal() {
      let price = 0;
      this.invoiceData.products.forEach(product => {
        price +=
          product.order_info.product_cost * 1000* product.order_info.product_quantity/1000;
      });
      return price;
    },
    // payments() {
    //   let payment = 0;
    //   this.invoiceData.payments.forEach(p => {
    //     payment += Number(p.payment_amount);
    //   })
    //   return payment;
    // },
    // balance() {
    //   return Number(this.invoiceData.total - this.payments);
    // },
    cartons() {
      let total = 0;
      this.invoiceData.products.forEach(p => {
        total += Number(p.order_info.cartons);
      });
      return total;
    },
    cbm() {
      let cbm = 0;
      this.invoiceData.products.forEach(p => {
        cbm += Number(p.order_info.cbm);
      });
      return cbm;
    },
    gross() {
      let gross = 0;
      this.invoiceData.products.forEach(p => {
        gross += Number(p.order_info.gross_weight);
      });
      return gross;
    }
  }
};
</script>
<style scoped>
.quotation-title {
  display: flex;
  align-content: space-between;
}
th,
td {
  /* margin: 0; */
  padding: 10px;
}
.th-right {
  text-align: right !important;
}
.invoice-header {
  display: flex;
  justify-content: space-between;
}
.invoice-header-right {
  text-align: right;
}
.invoice-brief {
  display: flex;
  justify-content: space-between;
}
.invoice-table td img {
  max-width: 120px;
  max-height: 120px;
}
.invoice-value {
  font-size: 20px;
  font-weight: bold;
}
.invoice-table-tr-top {
  border-top: 1px solid #ccc;
}
</style>
