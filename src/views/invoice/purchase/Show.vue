<template>
<div class="container purchase-order mt-3">
  <div class="purchase-header">
    <h6 align="center">供销合同
      
    </h6>
    <div class="code-serial">
      <div>编号: </div>
      <div>
        <small>#{{$route.params.id}}-</small>
        <small>{{ids.length}}-</small>
        <span v-for="(n, ind) in ids" 
        :key="ind" @click="selectId(n)" 
        :class="{active: n == selectedId}">
          {{n}}
        </span>
      </div>
    </div>
    <div>付款方式: </div>
  </div>
  <div class="purchase-supplier-brief">
      <div>供货(甲方):
        <div v-for="(su, ind) in settleSupplier()" :key="ind">
          <div>{{su.name}}</div>
          <div>{{su.address}}</div>
          <div>{{su.tel}}/{{su.fax}}</div>
          <div>{{su.contact_person}}</div>
          <div>{{su.mobile}}</div>
        </div>
        
      </div>
      <div>
        销货(乙方): 
        <div v-if="selectedId!=''">
          <div>{{BILLFROM.company}} </div>
          <div>{{BILLFROM.address}}</div>
          <div>{{BILLFROM.contact_person}}</div>
          <div>{{BILLFROM.phone}}</div>
        </div>
      </div> 
  </div>

  <div>
    <table class="table">
      <tr>
        <th>型号, 图片</th>
        <th>规格描述</th>
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
        </td>      
      </tr>
     <tr>
       <td colspan="5">总计:</td>
       <td>message</td>
     </tr>
    </table>
  </div>

  <div class="purchase-note">

  </div>

  <div class="purchase-terms">
    <div>相关注意事宜(丰富下条款)

    </div>
    <div>一.甲乙双方在此订购合同盖章互传,确认订单。甲方安排一台产前样供乙方确认生产。</div> 
    <div>
      二.交货方式:货物在永康/东莞完成交付，乙方安排快递/物流取货。 
    </div>
    <div>
      三.甲方必须按双方协商日期交货，收到定金后20个工作日。逾期超过7天后，每天逾期将有0.5%的罚款。逾期超过15天，乙方有权 取消订单，并索求所付定金和相应损失。
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
  </div>

</div>
</template>
<script>
// import { getFilterArray } from "../../util/getFilterArray";
import BILLFROM from "../../../api/bill";

export default {
  name: "PurchaseShow",
  data() {
    return {
      purchasesData: "",
      ids: [],
      selectedId: "",
      suppliersData: "",
      BILLFROM: BILLFROM
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
    }
  },
  created() {
      this.getInvoiceData();
      this.getUniqueSupplierIds();
      this.getSuppliersData();
  },
  computed: {
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
.active {
  /* font-weight: 500; */
  /* border: 1px solid $ddd; */
  color: white;
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
</style>
