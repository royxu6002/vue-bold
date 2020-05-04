<template>
  <div class="container">
    <div class="invoice-title" align="center">
      <h5 class="mt-3">COMLIBRA ELECTRONIC CO., LTD</h5>
      <div>ADD:ROOM 2112, BAOLONG SQUARE, XIAOSHAN, HANGZHOU, ZHEJIANG</div>
      <h5 class="m-3">PACKING LIST</h5>
    </div>
    <hr />

    <div class="row invoice-brief">
      <div class="right">
        <small>SHIPPING MARK </small>
        <div>
            <div v-for="(product, index) in invoiceData.products" :key="index">
              <div>
                {{product.order_info.shipping_mark}}
              </div>
            </div>
        </div>
      </div>

      <div class="left">
        <div><small>INVOICE #: {{invoiceData.id}}</small></div>
        <div><small>DATE: {{invoiceData.deadline}}</small></div>
      </div>
      
    </div>

    <div class="row invoice-table">
      <table
        valign="top"
        cellspacing="10px 0"
        cellpadding="10px 0"
        width="100%"
        text-align="center"
        style="border-collapse:collapse"
      >
        <tr style="border-bottom: 1px solid #171218">
          <th>
            ART. & DESCRIPTION
          </th>
          <th>QTY</th>
          <th>PCS/CTN</th>
          <th>CTNS</th>
          <th>CBM</th>
          <th>N.W.</th>
          <th class="th-right">G.W.</th>
        </tr>
        <tr
          style="border-bottom: 1px solid #ccc"
          v-for="(product, index) in invoiceData.products"
          :key="index"
        >
          <td>
            {{ product.product_name }}
          </td>
          <td>{{ product.order_info.product_quantity }}</td>
          <td>{{ product.order_info.product_number_per_carton }}</td>
          <td>{{ product.order_info.cartons }}</td>
          <td>{{ product.order_info.cbm }}</td>
          <td>{{ product.order_info.net_weight }}</td>
          <td class="th-right">{{ product.order_info.gross_weight }}</td>
        </tr>

        <tr style="font-weight: 500">
          <td>TOTAL</td>
          <td colspan="2" align="left">{{ totalQuantity }} PCS</td>
          <td>{{ cartons }} CTNS</td>
          <td>{{ cbm }} CBM</td>
          <td>{{ net }} KGS</td>
          <td align="right">{{gross}} KGS</td>
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
            <br /><br />
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
    totalQuantity() {
      let q = 0;
      this.invoiceData.products.forEach(product => {
        q += product.order_info.product_quantity;
      });
      return q;
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
    net() {
      let net = 0;
      this.invoiceData.products.forEach(p => {
        net += Number(p.order_info.net_weight);
      });
      return net;
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
