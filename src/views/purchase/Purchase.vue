<template>
<div class="container purchase-order mt-3">
  <div class="purchase-header">
    <h6 align="center">采购合同</h6>
    <div>编号:{{purchaseData.id}}</div>
    <div>
      <div class="align-left">采购方: Comlibra ELECTRONIC</div>
      <div class="align-right">工厂: </div> 
    </div>
    <div>付款方式: {{}}</div>
  </div>
  <div>
    <table>
      <tr>
        <th>型号</th>
        <th>产品名称</th>
        <th>规格</th>
        <th>数量</th>
        <th>单价</th>
        <th>总计</th>
      </tr>
      <tr v-for="(product, index) in purchaseData.products" :key="index">
        <td>{{product.product_name}}</td>
        <td>{{product.product_description}}</td>
        <td>{{product.order_info.product_quantity}}</td>
        <td>{{product.exw_price}}</td>
      </tr>
    </table>
  </div>
  <div class="purchase-note">

  </div>

  <div class="purchase-terms">
    <div>相关注意事宜</div>
    <div>一.甲乙双方在此订购合同盖章互传,确认订单。甲方安排一台产前样供乙方确认生产。 二.交货方式:货物在永康/东莞完成交付，乙方安排快递/物流取货。 三.甲方必须按双方协商日期交货，收到定金后20个工作日。逾期超过7天后，每天逾期将有0.5%的罚款。逾期超过15天，乙方有权 取消订单，并索求所付定金和相应损失。
四.甲方必须保证所有产品符合国家规定和不违反各项法规。 五.验收:甲方保证产品质量，产品开箱不合格率必须低于百分之一，否则乙方可以要求退换货并扣除相应的QC工时费用。 六.保修:甲方须保证提供给乙方的产品如在使用过程中有质量问题,三个月包换. 一年免费维修,超过一年的产品甲方亦要承但维修责任，但可以收取相关费用。
零配件需提供备品。
七.未尽事宜,由甲乙双方协商解决,如协商无效,双方同意有深圳仲载。
八.同经双方签定盖章之日起生效
一式两份，甲乙方各执一份复印件原件同样具有同等法律效用。</div>
  </div>
</div>
</template>
<script>
import axios from "axios";

export default {
  name: "PurchaseOrder",
  data() {
    return {
      purchaseData: ""
    };
  },
  methods: {
    getInvoiceData() {
      axios
        .get(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id)
        .then(res => (this.purchaseData = res.data))
        .catch(err => alert(err));
    }
  },
  created() {
      this.getInvoiceData();
  }
};
</script>
<style></style>
