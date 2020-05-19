<template>
<div class="container purchase-order mt-3">
  <div class="purchase-header">
    <h6 align="center">供销合同
      
    </h6>
    <div class="code-serial">
      <div>编号: </div>
      <div>
        <small>CLE#{{$route.params.id}}-</small>
        <small @click="hiddenData">{{ids.length}}-</small>
        <span v-for="(n, ind) in ids" 
        :key="ind" @click="selectId(n)" 
        :class="{active: n == selectedId}">
          {{n}}
        </span>
      </div>
    </div>
  </div>

  <div class="purchase-supplier-brief mt-3">
      <div>甲方(供货商):
        <div v-for="(su, ind) in settleSupplier()" :key="ind">
          <div>{{su.name}}</div>
          <div>{{su.address}}</div>
          <div>{{su.tel}}/{{su.fax}}</div>
          <div>{{su.contact_person}}</div>
          <div>{{su.mobile}}</div>
        </div>
        
      </div>
      <div>
        乙方(销货商): 
        <div v-if="selectedId!=''">
          <div>{{BILLFROM.company}} </div>
          <div>{{BILLFROM.address}}</div>
          <div>{{BILLFROM.contact_person}}</div>
          <div>{{BILLFROM.phone}}</div>
        </div>
      </div> 
  </div>


  <div class="mt-3">
    甲乙双方经协商达成以下协议:
    <table class="table">
      <tr>
        <th>型号</th>
        <th>规格</th>
        <th>数量</th>
        <th>单价</th>
        <th>其他要求</th>
        <th>合计</th>
      </tr>
      <!-- 此处循环过滤供应商 ID 的产品数据 -->
      <tr v-for="(purchase, index) in filteredBy()" :key="index">
        <td><span v-for="(product, inx) in settledProduct(purchase.product_id)" :key="inx">
          {{product.product_name | firstStr}}
          <img :src="product.imgs[0]" width="200px">
          </span>
        </td>
        <td>{{purchase.custom_requirement}}</td>
        <td>{{purchase.quantity}}</td>
        <td>
          <div class="smallest">
            <span v-if="purchase.price_term == 'exw_no_tax'">出厂不含税¥</span>
            <span v-if="purchase.price_term == 'exw_tax'">出厂含税¥</span>
            <span v-if="purchase.price_term == 'cpt_no_tax'">进仓不含税¥</span>
            <span v-if="purchase.price_term == 'cpt_tax'">进仓含税¥</span>
            <span v-if="purchase.price_term == 'fob_rmb'">FOB人民币¥</span>
            <span v-if="purchase.price_term == 'fob_usd'">FOB美金$</span>
          </div>
          {{purchase.price}}
        </td>
        <td>{{purchase.other_requirement}}</td>
        <td>
          {{multiply(purchase.price, purchase.quantity)}}
        </td>      
      </tr>
     <tr>
       <td colspan="5">总计:</td>
       <td>{{total}}</td>
     </tr>
    </table>
  </div>

  <div class="purchase-note">
    <div class="mb-3">备注: </div>
    <div>甲方收款资料:</div>
  </div>

  <div class="purchase-terms">
    <div>相关注意事宜:

    </div>
    <div>一.甲乙双方在此供销合同盖章互传,确认订单。甲方安排一台产前样供乙方确认生产。</div> 
    <div>
      二.交货方式:货物在永康/东莞完成交付，乙方安排快递/物流取货。 
    </div>
    <div>
      三.甲方必须按双方协商日期于{{purchasesData.due_date}}之前交货,逾期超过7天后,每天逾期将有0.5%的罚款,逾期超过15天，乙方有权取消订单，并索求所付定金和相应损失。
    </div>
    <div>
      四.甲方必须保证所有产品符合国家规定和不违反各项法规。 
    </div>
    <div>
      五.验收:甲方保证产品质量，产品开箱合格率必须不低于行业标准(或者双方约定的AQL标准)，否则乙方可以要求退换货并扣除相应的QC工时费用.
    </div>
    <div>
      六.保修:甲方须保证提供给乙方的产品如在使用过程中有质量问题, 三个月包换; 一年免费维修,超过一年的产品甲方亦要承但维修责任，但可以收取相关费用; 零配件需提供适当数量备品。
    </div>
    <div>
      七.未尽事宜,由甲乙双方协商解决,如协商无效,双方同意由当地有关司法部门仲载。
    </div>
    <div>
      八.本合同经双方签定盖章之日起生效一式两份，甲乙方各执一份复印件原件同样具有同等法律效用。
    </div>
    <div style="display: flex; justify-content: space-around;" class="mt-5">
      <div>
        <p>甲方经手人签字:_________________</p>
        <p class="mt-5">盖章</p>
      </div>
      <div>
        <p>乙方经手人签字:_________________</p>
        <p class="mt-5">盖章</p>
      </div>
    </div>
    <div>温馨提示: 请签字回传确认订单.</div>
  </div>

</div>
</template>
<script>
// import { getFilterArray } from "../../util/getFilterArray";

export default {
  name: "PurchaseShow",
  data() {
    return {
      purchasesData: "",
      ids: [],
      selectedId: "",
      suppliersData: "",
    };
  },
  methods: {
    getInvoiceData() {
      this.axios
        .get(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id)
        .then(res => (this.purchasesData = res.data))
        .catch(err => alert(err));
    },
    getUniqueSupplierIds() {
      this.axios.get(this.GLOBAL.baseUrl+"/invoice/"+this.$route.params.id+"/supplierids")
      .then(res => this.ids = res.data)
      .catch(err => alert(err))
    },
    getSuppliersData() {
      this.axios.get(this.GLOBAL.baseUrl+"/supplier")
      .then(res=>this.suppliersData = res.data)
      .catch(err => alert(err))
    },
    selectId(id) {
      this.selectedId = id;
    },
    hiddenData(){
      this.selectedId = "";
    }
  },
  created() {
      this.getInvoiceData();
      this.getUniqueSupplierIds();
      this.getSuppliersData();
  },
  computed: {
    multiply() {
      return (a, b) => {
        let x = new this.BIGNUMBER(a);
        return x.multipliedBy(b);
      }
    },
    filteredBy() {
      return () => {
        let data = this.purchasesData.purchase_info;
        return data.filter(d => d.supplier_id == this.selectedId);
      };
    },
    settledProduct() {
      return (id) => {
        let data = this.purchasesData.products;
        return data.filter(d => d.id == id);
      }
    },
    settleSupplier() {
      return () => {
        return this.suppliersData.filter(d => d.id == this.selectedId);
      };
    },
    total() {
      let i = 0;
      if(this.filteredBy().length>0) {
        this.filteredBy().forEach(purchase => {
          let x = new this.BIGNUMBER(purchase.price);
          i += Number(x.multipliedBy(purchase.quantity));
        });
        return i;
      } 
      return 0;
      
    }
  },
  filters: {
    firstStr: function (str) {
      var arr = str.split(" ");
      return arr[0];
    }
  }
};
</script>
<style scoped>
.purchase-supplier-brief{
  display: flex;
  justify-content: space-between;
}
.purchase-note{
  height: 150px;
}
.active {
  color: white !important;
  background-color: black;
  padding: 5px;
}
.smallest{
  font-size: 2px;
  font-weight: 70;
}
.code-serial{
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.table td, .table th {
    vertical-align: middle !important;
}
</style>
