<template>
  <div class="invoice_create mt-3">
    <div class="invoice-brief row">
      <div class="left">
        <small>Quotation #: {{ invoiceData.id }}</small>
        <div><small>Date issued: {{ invoiceData.issued_date }}</small></div>
        <div><small>Expiry Date: {{ invoiceData.due_date }}</small></div>
      </div>

      <div class="invoice-header-left">
        <small>TO</small>
        <h6 class="mt-2">{{ invoiceData.client.company }}</h6>
        <div>{{ invoiceData.client.address }}</div>
        <div>{{ invoiceData.client.tel }}</div>
        <div>{{ invoiceData.client.email }}</div>
      </div>

      <div class="invoice-header-right">
        <small>FROM</small>
        <h6 class="mt-2">{{BILLFROM.company}}</h6>
        <div class="align-right">
          {{BILLFROM.address}}
        </div>
        <div>{{BILLFROM.phone}}</div>
        <div>{{BILLFROM.email}}</div>
      </div>

    </div>

    <div class="invoice-table mt-3">
      <table class="table" style="cellpadding:5px;">
        <tr>
          <th>
            ART.DESCRIPTION
          </th>
          <th>IMAGE</th>
          <th>REMARK</th>
          <th>QTY</th>
          <th>Package</th>
          <th>COST</th>
          <th class="th-right">PRICE</th>
        </tr>

        <tr
          v-for="(product, index) in invoiceData.products"
          :key="index"
        >
          <td>{{ product.product_name }}
            <span v-html="product.product_brief_intro"></span>
          </td>
          <td>
            <img :src="product.imgs[0]" alt="" />
          </td>
          <td>
            {{ product.order_info.product_custom }}
            </td>
          
          <td>{{ product.order_info.product_quantity }}</td>

          <!-- 包装信息 -->
          <td>
              TOTAL 
              {{ Number(product.order_info.cartons) }} CARTONS,
              {{ product.order_info.cbm }} CBM, 
              {{ product.order_info.gross_weight }} KGS<br>
              {{ product.order_info.product_number_per_carton }}PCS/CARTON OF
              {{ packageDetail(index, product.order_info.product_number_per_carton) }}
          </td>
          <td>{{product.order_info.currency}}{{ product.order_info.product_cost }}</td>
          <td align="right">
            {{product.order_info.currency}}{{
              product.order_info.product_cost * 1000* 
                product.order_info.product_quantity/1000
            }}
          </td>
        </tr>

        <tr style="font-weight: 500">
          <td colspan="6" align="left">Subtotal</td>
          <td align="right">{{invoiceData.currency_type}}{{ subtotal }}</td>
        </tr>

        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.shipment_cost"
        >
          <td colspan="6" align="left">
            Shipping Cost
          </td>
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.shipment_cost }}</td>
        </tr>
        <tr
          style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc"
          v-if="invoiceData.discount"
        >
          <td colspan="6" align="left">
            Discount
          </td>
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.discount }}</td>
        </tr>

        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="6" align="left">
            Total
          </td>
          <td align="right">{{invoiceData.currency_type}}{{ invoiceData.total }}</td>
        </tr>
      </table>
    </div>

    <div class="invoice-terms mt-3">
      <table align="center" cellpadding="10px">
        <tr>
          <td valign="top" style="font-weight:bold;">PACKING:</td>
          <td colspan="3" valign="top">
            <div v-for="(product, index) in invoiceData.products" :key="index">
              <div>
                SHIPPING MARK: {{ product.order_info.shipping_mark }}
              </div>
            </div>

            <div>
              TOTAL {{ cartons }} CARTONS, {{ cbm }} CUBIC METERS,
              {{ gross }} KILOGRAMMES.
            </div>

          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">SHIPMENT:</td>
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
          <td valign="top" style="font-weight:bold;">PAYMENT:</td>
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
  name: "QuotationPackingShow",
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
          product.order_info.product_cost * 1000*product.order_info.product_quantity/1000;
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
    },
    packageDetail() {
      return (index, id) => {
        let i = this.invoiceData.products[index].packages.filter(p => p.product_package_item_num == id);
        // return i[0];
        return i[0].product_package_length+'x'+i[0].product_package_width+'x'+i[0].product_package_height+'CM';
      }
    }
  }
};
</script>
<style scoped>
.invoice_create {
  margin: 0;
  padding: 0 10px;
}
th, td {
  /* margin: 0; */
  padding: 10px;
}
.th-right {
  text-align: right !important;
}

.invoice-header-right {
  text-align: right;
}
.invoice-brief {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.invoice-table td img {
  max-width: 120px;
  max-height: 120px;
}
.invoice-table-tr-top {
  border-top: 1px solid #ccc;
}
</style>
