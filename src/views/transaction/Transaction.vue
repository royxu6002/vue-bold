<template>
  <div class="transaction container mt-3">
    <Nav />
    <div class="transaction-header mt-3">
      <router-link to="/transaction/create" class="btn btn-success btn-small float-right mb-3">Create Transaction</router-link>
    </div>
    <div class="transaction">
      <span
        class="mr-3"
        @click="toggleTypes('payments')"
        :class="{ active: types == 'payments' }"
        >Payments</span
      >
      <span
        @click="toggleTypes('expenses')"
        :class="{ active: types == 'expenses' }"
        >Expenses</span
      >

      <div class="payments-table">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Paid</th>
              <th scope="col">Invoice #</th>
              <th scope="col">Customer</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment method</th>
              <th scope="col">Bank note</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(transaction, index) in filteredTransactionsData(types)"
              :key="index"
            >
              <th scope="row">{{ transaction.id }}</th>
              <td>{{ transaction.paid_at }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'InvoiceShow',
                    params: { id: transaction.invoice_id }
                  }"
                >
                  {{ transaction.invoice_id }}
                </router-link>
              </td>
              <td>{{ transaction.customer.company }}</td>
              <td>US${{ transaction.amount }}</td>
              <td>{{ transaction.payment_method }}</td>
              <td>{{ transaction.note }}</td>
              <td style="text-align: center">
                <router-link
                  class="mr-2"
                  :to="{name: 'TransactionEdit', params: {id: transaction.id}}"
                >
                  <i class="iconfont icon-edit"></i>
                </router-link>
                <span @click="deleteTransaction(transaction.id)">
                  <i class="iconfont icon-delete"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      transactionsData: [],
      types: "payments"
    };
  },
  methods: {
    getTransactionsData() {
      axios
        .get(this.GLOBAL.baseUrl + "/transaction")
        .then(res => {
          this.transactionsData = res.data;
        })
        .catch(err => alert(err));
    },
    toggleTypes(value) {
      this.types = value;
    },
    deleteTransaction(id) {
      if(window.confirm(`Are you sure delete ${id}的 transaction?`)) {
        axios
        .delete(this.GLOBAL.baseUrl + "/transaction/" + id)
        .then(res => {
          alert(res.data.msg);
          this.$router.go(0);
        })
        .catch(err => alert(err));
      }
    }
  },
  created() {
    this.getTransactionsData();
  },
  computed: {
    // 过滤 type = payments 数据, 把 types 定义为一个变量, 可以 tab 数值, 传递到计算属性中来.
    filteredTransactionsData() {
      return (value) => {
        return this.transactionsData.filter(p => p.types == value);
      };
    }
  },
  // watch:{
  //     // "$route": 'getTransactionsData'
  //     $route (to, from) {
  //       this.$router.go(0);
  //     }
  // },
};
</script>
<style>
.transaction-header {
  vertical-align: center;
}
.transaction span {
  color: #ddd;
}
.active {
  color: #000 !important;
  font-size: 1.2em;
  font-weight: 500px;
}
</style>
