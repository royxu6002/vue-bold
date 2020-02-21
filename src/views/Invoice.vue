<template>
  <div class="invoice_index container">
    <div class="nav container">
      <router-link to="/">ToDo</router-link>
      <router-link to="/faq">FAQ</router-link>
      <router-link to="/customer">Customers</router-link>
      <router-link to="/client">客户</router-link>
      <router-link to="/invoice">Invoice</router-link>
      <router-link to="/transaction">Transaction</router-link>
      <router-link to="/shipment">Shipment</router-link>
      <router-link to="/quotation">Quotation</router-link>
      <router-link to="/test">Test</router-link>
    </div>
    <div><router-link to="/invoice/create">Create Invoice</router-link></div>
    <div class="invoice-table">
      <table class="table table-hover">
        <tr>
          <th>id</th>
          <th>Issued</th>
          <th>client</th>
          <th>invoice value</th>
          <th>balance</th>
          <th>DOC</th>
        </tr>
        <tr v-for="(invoice, index) in invoicesData" :key="index">
          <td>
            <router-link
              :to="{ name: 'InvoiceShow', params: { id: invoice.id } }"
            >
              {{ invoice.id }}
            </router-link>
          </td>
          <td>{{ invoice.issued_date }}</td>
          <td>{{ invoice.client.company }}</td>
          <td>US${{ invoice.total }}</td>
          <th>US${{ balance(invoice) }}</th>
          <th>
            <router-link
              :to="{ name: 'CommercialInvoice', params: { id: invoice.id } }"
              ><i class="iconfont icon-survey mr-3"></i
            ></router-link>
            <router-link
              :to="{ name: 'PackingList', params: { id: invoice.id } }"
              ><i class="iconfont icon-form"></i
            ></router-link>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      invoicesData: ""
    };
  },
  methods: {
    getInvoicesData() {
      axios
        .get(this.GLOBAL.baseUrl + "/invoice")
        .then(res => {
          if (res.status == 200) {
            this.invoicesData = res.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  created() {
    this.getInvoicesData();
  },
  computed: {
    balance() {
      return invoice => {
        let b = 0;
        invoice.payments.forEach(payment => {
          b += Number(payment.payment_amount);
        });
        return invoice.total - b;
      };
    }
  }
};
</script>
<style>
.nav-header {
  display: flex;
  align-content: space-around;
}
</style>
