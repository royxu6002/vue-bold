<template>
  <div class="container">
    <div class="invoice-title" align="center">
      <h5 class="mt-3">COMLIBRA ELECTRONIC CO., LTD</h5>
      <div>ADD:ROOM 2112, BAOLONG SQUARE, XIAOSHAN, HANGZHOU, ZHEJIANG</div>
      <h5 class="m-3">COMMERCIAL INVOICE</h5>
      <div align="right">
          <div><small>INVOICE #: {{invoiceData.id}}</small></div>
          <div><small>DATE: {{invoiceData.deadline}}</small></div>
      </div>
    </div>
    <hr />

    <div class="row invoice-brief">
      <div class="right">
        <small>BILL TO </small>
        <div>
            <div>{{invoiceData.client.company}}</div>
            <div>{{invoiceData.client.address}}</div>
            <div>{{invoiceData.client.tel}}</div>
        </div>
      </div>

      <div class="left">
        <div><small>FROM: {{invoiceData.from}}</small></div>
        <div><small>TO: {{ invoiceData.to }}</small></div>
        <div>
          <small>Delivery term: {{ invoiceData.delivery_term }}</small>
        </div>
        <div>
          <small>Tracking no. {{invoiceData.tracking_no}}</small>
        </div>
        <div><small>
          Vessel {{invoiceData.vessel}}
          </small></div>
          <div><small>Container no. {{invoiceData.container_no}}</small></div>
          <div><small>Seal no. {{invoiceData.seal_no}}</small>
          </div>
          <div><small>ETD: {{invoiceData.etd}}</small></div>
          <div><small>ETA: {{invoiceData.eta}}</small></div>
      </div>

      
    </div>

    <div class="row invoice-table">
      <table
        valign="top"
        cellspacing="10px 0"
        cellpadding="10px 0"
        width="100%"
        style="border-collapse:collapse"
      >
        <tr style="border-bottom: 1px solid #171218">
          <th>
            MARK & ARTICLE
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
            {{ product.order_info.shipping_mark }}
            <br>
            {{ product.product_name }}
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

      </table>
    </div>
    <div class="invoice-stamp">
      <table align="right" cellpadding="10px">
        <tr align="center">
          <td
            colspan="2"
            style="background-image:url('../../../assets/imgs/stamp.png');background-size:contain;background-repeat:no-repeat;background-position:center;"
          >
            THE SELLER:<br />
            ROY XU<br /><br />
            COMLIBRA ELECTRONIC CO., LTD.<br />Signature & Stamp
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
  padding: 20px;
  justify-content: space-between;
}
.invoice-unit {
  font-size: 15px;
  font-weight: 300;
}
.invoice-table-tr-top {
  border-top: 1px solid #ccc;
}
</style>
