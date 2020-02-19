<template>
  <div class="transaction-create container mt-3">
    <h3>Edit transaction</h3>
    <div class="create-transaction-form transaction-form">
      <form @submit.prevent="updateTransaction">
        <div class="info">
        
          <div class="form-group">
            <label>Types</label>

            <select
              class="form-control"
              v-model="transactionData.type"
              required
            >
              <option>Select transaction types</option>
              <option value="payments">Payments收入</option>
              <option value="expenses">Expenses支出</option>
            </select>
          </div>


          <div class="form-group">
            <label for="">Invoice ID</label>
            <select
              v-model="transactionData.invoice_id"
              class="form-control"
              required
            >
              <option value="">Select Invoice ID</option>
              <option
                :value="invoice.id"
                v-for="(invoice, index) in invoicesData"
                :key="index"
                ># {{ invoice.id }} - for: {{ invoice.client.company }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="">Amount</label>
            <input
              type="number"
              name="payment_amount"
              class="form-control"
              placeholder="$0.00"
              required
              v-model="transactionData.payment_amount"
            />
          </div>

          <div class="form-group">
            <label for="">Payment method</label>
            <select
              name="payment_method"
              class="form-control"
              required
              v-model="transactionData.payment_method"
            >
              <option>Select Payment Method</option>
              <option value="Paypal">Paypal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Alipay">Alipay</option>
              <option value="Wechatpat">Wechatpay</option>
              <option value="Check">Check</option>
              <option value="Debit">Debit</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">CASH</option>
            </select>
          </div>

          <div class="form-group">
            <label for="">Internal payment note</label>
            <textarea
              name="internal_payment_note"
              rows="2"
              class="form-control"
              v-model="transactionData.internal_payment_note"
            ></textarea>
          </div>
        </div>

        <div class="btns">
          <button class="btn btn-primary mr-3" type="submit">Update</button>
          <router-link class="btn btn-danger" to="/transaction"
            >Cancel</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "TransactionCreate",
  data() {
    return {
      transactionData: {},
      invoicesData: ""
    };
  },
  methods: {
    getInvoicesData() {
      axios
        .get(this.GLOBAL.baseUrl + "/invoice")
        .then(res => (this.invoicesData = res.data))
        .catch(err => alert(err));
    },
    getTransactionData() {
      axios.get(this.GLOBAL.baseUrl + "/transaction/" + this.$route.params.id)
      .then(res => this.transactionData = res.data)
      .catch(err => alert(err))
    },
    updateTransaction() {
      axios
        .patch(
          this.GLOBAL.baseUrl + "/transaction/" + this.$route.params.id,
          qs.stringify(this.transactionData)
        )
        .then(res => {
            alert(res.data.msg);
            this.$router.push({ name: "Transaction" });
        })
        .catch(err => alert(err));
    }
  },
  created() {
    this.getInvoicesData();
    this.getTransactionData();
  }
};
</script>
<style></style>
