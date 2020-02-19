<template>
  <div class="invoice_index container">
    <router-link :to="{ name: 'InvoiceCreate' }">Create Invoice</router-link>
    <div class="invoice-table">
      <table class="table table-hover">
        <tr>
          <th>id</th>
          <th>Issued</th>
          <th>client</th>
          <th>invoice value</th>
          <th>balance</th>
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
<style lang="stylus"></style>
