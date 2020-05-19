<template>
  <div class="container">
    <div class="invoice-title" align="center">
      <h5 class="mt-3">COMLIBRA ELECTRONIC CO., LTD</h5>
      <div>ADD:ROOM 2112, BAOLONG SQUARE, XIAOSHAN, HANGZHOU, ZHEJIANG</div>
      <h5 class="m-3">COMMERCIAL INVOICE</h5>
    </div>
    <hr />
    <div class="row invoice-brief">
      <div class="right">
        <small>BILL TO </small>
        <div>
          <div>{{ invoiceData.client.company }}</div>
          <div>{{ invoiceData.client.address }}, {{ invoiceData.client.country }}</div>
          <div>{{ invoiceData.client.tel }}</div>
        </div>
        <br />
        <div class="left" align="left">
          <div>
            <small>INVOICE #: {{ invoiceData.id }}</small>
          </div>
          <div>
            <small>DATE: {{ invoiceData.deadline }}</small>
          </div>
        </div>
      </div>
      <div align="left">
        <div>
          <small>FROM: {{ invoiceData.from }}</small>
        </div>
        <div>
          <small>TO: {{ invoiceData.to }}</small>
        </div>
        <div v-if="invoiceData.shipment">
          <small>Delivery term: 
            {{ invoiceData.shipment[0].delivery_term }}
          </small>
        </div>
        <div v-if="invoiceData.shipment">
          <small>Tracking no. {{ invoiceData.shipment[0].tracking_no }}</small>
        </div>
        <div v-if="invoiceData.shipment">
          <small> Vessel {{ invoiceData.shipment[0].vessel }} </small>
        </div>
        <div v-if="invoiceData.shipment">
          <small>Container no. {{ invoiceData.shipment[0].container_no }}</small>
        </div>
        <div v-if="invoiceData.shipment">
          <small>Seal no. {{ invoiceData.shipment[0].seal_no }}</small>
        </div>
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
            <br />
            {{ product.product_name }}
          </td>
          <td>{{ product.hs_code }}</td>
          <td>{{product.order_info.currency}}{{ product.order_info.product_cost }}</td>
          <td>{{ product.order_info.product_quantity }}</td>
          <td align="right">
            {{product.order_info.currency}}
            {{multiply(product.order_info.product_cost, product.order_info.product_quantity)}}
          </td>
        </tr>

        <tr style="font-weight: 500">
          <td colspan="2" rowspan="6"></td>
          <td colspan="2" align="left">Subtotal</td>
          <td align="right">{{invoiceData.currency_type}}{{ subtotal }}</td>
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
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.total }}</td>
        </tr>
      </table>
    </div>
    <div class="invoice-stamp">
      <table align="right" cellpadding="10px">
        <tr align="center">
          <td
            colspan="2"
            style="background:url('stamp.png');background-size:contain;background-repeat:no-repeat;background-position:center;"
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
     multiply() {
      return (a, b) => {
        let x = new this.BIGNUMBER(a);
        return x.multipliedBy(b);
      }
    },
    subtotal() {
      let price = 0;
      this.invoiceData.products.forEach(product => {
        let x = new this.BIGNUMBER(product.order_info.product_cost);
        price += Number(x.multipliedBy(product.order_info.product_quantity));
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
.invoice-table tr td{
  padding-right: 10px;
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
