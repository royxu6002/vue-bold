<template>
  <div class="invoice_create container">
    <div class="invoice-title" align="center">
      <h2>PROFORMA INVOICE</h2>
    </div>
    <div class="row invoice-header">
      <div class="invoice-header-left">
        <small>BILL TO</small>
        <h6 class="mt-2">{{ invoiceData.client.company }}</h6>
        <div>{{ invoiceData.client.address }}</div>
        <div>{{ invoiceData.client.tel }}</div>
        <div>{{ invoiceData.client.email }}</div>
      </div>
      <div class="invoice-header-right">
        <small>BILL FROM</small>
        <h6 class="mt-2">{{BILLFROM.company}}</h6>
        <div class="align-right">
          {{BILLFROM.address}}
        </div>
        <div>{{BILLFROM.phone}}</div>
        <div>{{BILLFROM.email}}</div>
      </div>
    </div>
    <hr />
    <div class="row invoice-brief">
      <div class="left">
        <small>Proforma Invoice #: {{ invoiceData.id }}</small>
        <div><small>Date issued: {{ invoiceData.issued_date }}</small></div>
        <div><small>Due Date: {{ invoiceData.due_date }}</small></div>
      </div>
      <div class="right">
        <small>Invoice Total </small>
        <div class="invoice-value">{{invoiceData.currency_type}}{{ invoiceData.total }}</div>
      </div>
    </div>
    <div class="row invoice-table">
      <div class="mt-3">
        <small>The aforementioned parties hereby agree and conclude a deal as
          below:</small>
      </div>
      <table
        valign="top"
        cellspacing="10px 0"
        cellpadding="10px 0"
        width="100%"
        style="border-collapse:collapse"
      >
        <tr style="border-bottom: 1px solid #171218">
          <th style="width: 40%">
            ART.NO. & DESCRIPTION
          </th>
          <th>REMARK</th>
          <th>HS CODE</th>
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
            <b>{{ product.product_name }}</b>
            <span v-html="product.product_brief_intro"></span>
          </td>
          <td>{{product.order_info.product_custom}}</td>
          <td>{{ product.hs_code }}</td>
          <td>{{product.order_info.currency}}{{ product.order_info.product_cost }}</td>
          <td>{{ product.order_info.product_quantity }}</td>
          <td align="right">
            {{product.order_info.currency}}{{
              product.order_info.product_cost * 1000 *
                product.order_info.product_quantity /1000
            }}
          </td>
        </tr>

        <tr style="font-weight: 500">
          <td colspan="3" rowspan="6">
            <br>
            <br>
            <div>
              PRICE TERMS: {{invoiceData.price_term}}, CHINA
            </div>
            <div>PAYMENT TERMS: {{invoiceData.payment_term}}.</div>
            <small> Please kindly remit the payment to following beneficiary's account:</small>
            <div v-if="invoiceData.payment_term == 'Paypal'">
              <div>Paypal account:</div>
              <div>BENEFICIARY.PUBLIC.PAYPAL.EMAIL</div>
            </div>
            <div v-if="invoiceData.currency_type == '¥'">
              <div>{{BENEFICIARY.PRIVATE.EVERBRIGHTBANK.CNNAME}}</div>
              <div>{{BENEFICIARY.PRIVATE.EVERBRIGHTBANK.ENNAME}}</div>
              <div>{{BENEFICIARY.PRIVATE.EVERBRIGHTBANK.ACCOUNT}}</div>
              <div>{{BENEFICIARY.PRIVATE.EVERBRIGHTBANK.ACCOUNTNO}}</div>
            </div>
            <div v-else>
              <div>Bank account:</div>
              <div>{{ BENEFICIARY.PUBLIC.BANK.ACCOUNTNAME }}</div>
              <div v-if="invoiceData.currency_type == '$'">{{BENEFICIARY.PUBLIC.BANK.USDACCOUNT}}</div>
              <div v-if="invoiceData.currency_type == '€'">{{BENEFICIARY.PUBLIC.BANK.EURACCOUNT}}</div>
              <div>{{BENEFICIARY.PUBLIC.BANK.NAME}}</div>
              <div>{{BENEFICIARY.PUBLIC.BANK.ADDRESS}}</div>
              <div>{{BENEFICIARY.PUBLIC.BANK.SWIFT}}</div>
              <div>{{BENEFICIARY.PUBLIC.BANK.CORRESPONDENTBANK}}</div>
              <div><div>{{BENEFICIARY.PUBLIC.BANK.CORRESPONDENTBANKSWIFT}}</div></div>
            </div>
              
          </td>
          <td colspan="2" align="left">Subtotal</td>
          <td align="right">{{invoiceData.currency_type}}{{subtotal}}</td>
        </tr>

        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.shipment_cost"
        >
          <td colspan="2" align="left"> 
            Shipping Cost
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
            Invoice Total
          </td>
          <td align="right">{{invoiceData.currency_type}}{{invoiceData.total}}</td>
        </tr>
        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="2" align="left">Paid to date</td>
          <td align="right">{{invoiceData.currency_type}}{{payments}}</td>
        </tr>

        <tr style="font-weight:500;font-size: 1.1em">
          <td colspan="2" align="left">BALANCE</td>
          <td align="right">{{invoiceData.currency_type}}{{balance}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: "InvoiceCreate",
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
        price += product.order_info.product_cost * 1000* product.order_info.product_quantity /1000;
      });
      return price;
    },
    payments() {
      let payment = 0;
      this.invoiceData.payments.forEach(p => {
        payment += Number(p.payment_amount);
      })
      return payment;
    },
    balance() {
      return Number(this.invoiceData.total) - Number(this.payments);
    },
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
th,
td {
  /* margin: 0; */
  padding: 10px 0;
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
.invoice-value {
  font-size: 20px;
  font-weight: bold;
}
.invoice-table-tr-top {
  border-top: 1px solid #ccc;
}
</style>
