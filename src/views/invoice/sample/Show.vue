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
        <h6 class="mt-2">Comlibra Electronic CO., Ltd</h6>
        <div class="align-right">
          Room 423, Baolong Sqaure, Xiaoshan, Hangzhou, China
        </div>
        <div>+86 18258194466</div>
        <div>18258194466@qq.com</div>
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
        <div class="invoice-value">${{ invoiceData.total }}</div>
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
            {{ product.product_brief_intro }}
          </td>
          <td>{{ product.hs_code }}</td>
          <td>US${{ product.order_info.product_cost }}</td>
          <td>{{ product.order_info.product_quantity }}</td>
          <td align="right">
            US${{
              product.order_info.product_cost *
                product.order_info.product_quantity
            }}
          </td>
        </tr>

        <tr style="font-weight: 500">
          <td colspan="2" rowspan="6"></td>
          <td colspan="2" align="left">Subtotal</td>
          <td align="right">US${{subtotal}}</td>
        </tr>
        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.shipment_cost"
        >
          <td colspan="2" align="left">
            TNT Shipping Cost
          </td>
          <td align="right">US${{ invoiceData.shipment_cost }}</td>
        </tr>
        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.discount"
        >
          <td colspan="2" align="left">
            Discount
          </td>
          <td align="right">US${{ invoiceData.discount }}</td>
        </tr>
        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="2" align="left">
            Invoice Total
          </td>
          <td align="right">US${{invoiceData.total}}</td>
        </tr>
        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="2" align="left">Paid to date</td>
          <td align="right">US${{payments}}</td>
        </tr>

        <tr style="font-weight:500;font-size: 1.1em">
          <td colspan="2" align="left">BALANCE</td>
          <td align="right">US${{balance}}</td>
        </tr>
      </table>
    </div>
    <div class="invoice-terms">
      <table cellpadding="10px">
        <tr>
          <td valign="top">
            PRICE TERMS: {{invoiceData.price_term}}, CHINA<br />
            PAYMENT TERMS: {{invoiceData.payment_term}}. <br />
            <small> Please kindly remit the payment to following beneficiary's account:</small>
           <br />
            <b>Paypal account:</b><br/>
            export@comlibra.com<br />
            <br>
            <b>Bank account:</b> <br />
            BENEFICIARY NAME: COMLIBRA ELECTRONIC CO., LTD..<br />
              A/C NO. FOR USD: NRA1 5623 1420 1050 0000 153<br />
              <!-- A/C NO. FOR EUR: NRA1 5623 3820 1050 0000 046<br> -->
              BENEFICIARY BANK: ZHEJIANG CHOUZHOU COMMERCIAL <br>
              BANK ADDRESS:YIWULEYUAN EAST, JIANGBIN RD, YIWU, ZHEJIANG, CHINA<br />
              SWIFT BIC: CZCBCN2X<br />
              CORRESPONDENT BANK: BANK OF AMERICA N.A.NEW YORK BRANCH <br />
              SWIFT BIC: BOFAUS3N
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "InvoiceCreate",
  data() {
    return {
      invoiceData: {}
    };
  },
  methods: {
    getInvoiceData() {
      axios
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
        price += product.order_info.product_cost * product.order_info.product_quantity;
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
<style>
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
