<template>
    <div class="container price mt-3">
        <div class="col-3 form-group">
            <small>不含税价格</small>
            <div>
                <input type="text" v-model="product.exw_price">
            </div>
        </div>

        <div class="col-3 form-group">
            <small>税点</small>
            <div>
                <input type="number" v-model="product.tax_rate">
            </div>
        </div>

        <div class="col-3 form-group">
            <small>含税价</small>
            <div>
                <input type="text" v-model="product.tax_price">
            </div>
            
        </div>

        <div class="col-3 form-group">
            <small>退税点</small>
            <div>
                <input type="number" v-model="product.refund_tax_rate">
            </div>
            
        </div>

        <div class="col-3 form-group">
            <small>退税</small>
            <div>
                <input type="text" v-model="product.refund_money">
            </div>
            
        </div>

        <div class="col-3 form-group">
            <small>FOB 费用</small>
            <div><input type="text" v-model="product.fob_cost"></div> 
        </div>

        <div class="col-3 form-group">
            <small>退税后成本</small>
            <div>
                <input type="text" v-model="product.real_cost">
            </div>
            
        </div>

        <div class="col-3 form-group">
            <small>汇率</small>
            <div>
                <input type="text" v-model="product.currency_rate">
            </div>
            
        </div>

        <div class="col-3 form-group">
            <small>报价</small>
            <div>
                <input type="text" v-model="product.quotation">
            </div>
            
        </div>

        <div class="col-3 form-group">
            <small>利润率</small>
            <div><input type="text" v-model="product.profit_rate"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Price",
    data() {
        return {
            product: {}
        }
    }
}
</script>
<style>
.price {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
}
</style>