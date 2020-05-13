<template>
  <div class="invoice_index container">
    <Nav />
    <hr>
    <div class="row invoice-quotation-header">
      <div class="mr-2">
        <router-link to="/invoice/create">
        Create
        </router-link>
      </div>
      <span @click="resetInvoicesData()" class="mr-2">All</span>
      <div :class="{active: type == 'invoice'}" class="mr-2">
        <span @click="toggleType('invoice')">
        Invoice
        </span>
      </div>
      <div :class="{active: type == 'quotation'}" class="mr-2"><span @click="toggleType('quotation')">
        Quotation
      </span>
      </div>
    </div>
    <div class="invoice-table">
      <table class="table table-hover">
        <tr>
          <th>id</th>
          <th>Issued</th>
          <th>Due</th>
          <th>client</th>
          <th>Value</th>
          <th v-if="type == 'invoice'">balance</th>
          <th v-if="type == 'invoice'">shipment</th>
          <th v-if="type=='invoice'">Purchase</th>
          <th>OPER.</th>
        </tr>
        <!-- 使用计算属性, 传递参数拿到过滤的数据 -->
        <tr v-for="(invoice, index) in filteredBy(type)" :key="index">
          <td>
            <!-- 创建一个 Quotation 页面 -->
            <router-link v-if="type == 'invoice'"
              :to="{ name: 'InvoiceShow', params: { id: invoice.id } }"
            >
              {{ invoice.id }}
            </router-link>

            <router-link v-else
              :to="{ name: 'QuotationPackingShow', params: { id: invoice.id } }"
            >
              <span class="iconfont icon-Quotation-Selected icon-smallfix"></span>
            </router-link>

            <router-link v-if="type == 'invoice'" :to="{name: 'SampleInvoiceShow', params: {id: invoice.id}}">
              <i class="iconfont icon-invoice mr-3 icon-smallfix"></i>
            </router-link>

            <router-link v-else
              :to="{ name: 'QuotationShow', params: { id: invoice.id } }"
            >
              {{ invoice.id }}
            </router-link>
            
          </td>
          <td>{{ invoice.issued_date }}</td>
          <td>{{ invoice.due_date }}</td>
          <td>
            <router-link :to="{name: 'CustomerShow', params: {id: invoice.client.id}}">
              {{ invoice.client.company }}
            </router-link>
          </td>
          <td>{{invoice.currency_type}}{{ invoice.total }}</td>
          <td v-if="type=='invoice'">{{invoice.currency_type}}{{ balance(invoice) }}</td>
          <td v-if="type=='invoice'">
            {{ invoice.shipment[0]? invoice.shipment[0].status.status:'no data' }}
            <!-- 有 shipmeng 才会产生 commercialInvoice -->
            <span v-if="invoice.shipment.length > 0">
              <router-link
                :to="{ name: 'CommercialInvoice', params: { id: invoice.id } }"
                v-if="type == 'invoice'">
                <i class="iconfont icon-invoices mr-3 icon-smallfix"></i>
              </router-link>
            </span>
            <!-- 装箱单, 订舱的时候需要这个 -->
            <router-link
              :to="{ name: 'PackingList', params: { id: invoice.id } }"
              v-if="type == 'invoice'"
              ><i class="iconfont icon-smallfix mr-3 icon-icon_Unpacking"></i
            ></router-link>
          </td>
          <td v-if="type=='invoice'">
            <!-- 创建采购订单 -->
            <span v-if="invoice.purchase_info.length>0">
              <router-link :to="{name: 'PurchaseUpdate', params: {id: invoice.id}}">
                <i class="iconfont icon-smallfix icon-update mr-2"></i>
              </router-link>
              <router-link :to="{name: 'PurchaseShow', params: {id: invoice.id}}">
                <i class="iconfont icon-smallfix icon-view"></i>
              </router-link>
            </span>

            <span v-else>
              <router-link :to="{name: 'PurchaseCreate', params: {id: invoice.id}}" v-if="type == 'invoice'">
                <i class="iconfont icon-smallfix icon-hammer1"></i>
              </router-link>
            </span>
              
          </td>
          <td>
             <!-- 发票编辑 -->
              <router-link :to="{name: 'InvoiceEdit', params: {id: invoice.id}}">
                <i class="iconfont icon-libra icon-smallfix mr-2"></i>
              </router-link>
                <a class="iconfont icon-smallfix icon-shaixuan1 mr-2" @click="filteredById(invoice.client.id)"></a>
              <a class="iconfont icon-smallfix icon-fuzhi" @click="replicateInvoice(invoice.id)"></a>
              

          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
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
      this.axios
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
    },
    replicateInvoice(id) {
      if(window.confirm('are you sure to reproduce a new invoice with these data?')) {
        this.axios.get(this.GLOBAL.baseUrl+"/invoice/"+id+"/duplicate")
        .then(res => {
          alert(res.data.msg);
          this.$router.go(0);
        })
        .catch(err => alert(err))
      }
    },
    filteredById(id) {
      let i = this.invoicesData.filter(invoice => invoice.client.id == id);
      this.invoicesData = i;
    },
    resetInvoicesData() {
      this.getInvoicesData();
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
    filteredBy() {
      return (type) => {
        return this.invoicesData.filter(invoice => invoice.type == type );
      }
    }
  }
};
</script>
<style scoped>
.nav-header {
  display: flex;
  align-content: space-around;
}
.invoice-quotation-header {
  margin: 20px;
}
.invoice-quotation-header .active{
  font-weight: bold;
}
</style>
