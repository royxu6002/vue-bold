<template>
  <div class="invoice_index container">
    <Nav />
    <div class="row invoice-quotation-header">
      <div><router-link to="/invoice/create">Create Invoice</router-link></div>
      <div :class="{active: type == 'invoice'}"><span @click="toggleType('invoice')">Invoice</span></div>
      <div :class="{active: type == 'quotation'}"><span @click="toggleType('quotation')">Quotation</span></div>
    </div>
    <div class="invoice-table">
      <table class="table table-hover">
        <tr>
          <th>id</th>
          <th>Issued</th>
          <th>client</th>
          <th>invoice value</th>
          <th>balance</th>
          <th>OPER.</th>
        </tr>
        <!-- 使用计算属性, 传递参数拿到过滤的数据 -->
        <tr v-for="(invoice, index) in filteredInvoicesData(type)" :key="index">
          <td>
            <!-- 创建一个 Quotation 页面 -->
            <router-link v-if="type == 'invoice'"
              :to="{ name: 'InvoiceShow', params: { id: invoice.id } }"
            >
              {{ invoice.id }}
            </router-link>
            <router-link v-else
              :to="{ name: 'QuotationShow', params: { id: invoice.id } }"
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
              v-if="type == 'invoice'"><i class="iconfont icon-survey mr-3"></i
            ></router-link>
            <router-link
              :to="{ name: 'PackingList', params: { id: invoice.id } }"
              v-if="type == 'invoice'"
              ><i class="iconfont icon-form"></i
            ></router-link>
            <span v-else><i class="iconfont icon-libra"></i></span>
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
      invoicesData: "",
      // 默认是 invoice 数据
      type: "invoice"
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
    },
    toggleType(type) {
      this.type = type;
    }
  },
  created() {
    this.getInvoicesData();
  },
  computed: {
    balance() {
      return (invoice) => {
        let b = 0;
        invoice.payments.forEach(payment => {
          b += Number(payment.payment_amount);
        });
        return invoice.total - b;
      };
    },
    filteredInvoicesData() {
      return (type) => {
        return this.invoicesData.filter(invoice => invoice.type == type );
      }
    }
  }
};
</script>
<style>
.nav-header {
  display: flex;
  align-content: space-around;
}
.invoice-quotation-header .active{
  font-size: 20px;
}
</style>
