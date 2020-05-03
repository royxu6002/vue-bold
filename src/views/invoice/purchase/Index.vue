<template>
    <div class="purchase-index-page container">
        <h4>this is purchase index page</h4>
        <div>{{purchasesData}}</div>
        <table>
            <thead>
                <th>ID</th>
                <th>Invoice ID</th>
                <th>Supplier ID</th>
                <th>Product ID</th>
                <th>Price</th>
                <th>Price Term</th>
                <th>Custom Requirement</th>
                <th>Other Requirement</th>
            </thead>
            <tbody>
                <tr v-for="(purchase, index) in purchasesData" :key="index">
                    <td>{{purchase.id}}</td>
                    <td>{{purchase.invoice_id}}</td>
                    <td>{{purchase.supplier_id}}</td>
                    <td>{{purchase.product_id}}</td>
                    <td>{{purchase.price}}</td>
                    <td>{{purchase.price_term}}</td>
                    <td>{{purchase.custom_requirement}}</td>
                    <td>{{purchase.other_requirement}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "PurchaseIndex",
    data() {
        return {
            purchasesData: ""
        }
    },
    methods: {
        getPurchasesData() {
            this.axios.get(this.GLOBAL.baseUrl+"/purchase/index")
            .then(res => this.purchasesData = res.data)
            .catch(err => alert(err))
        }
    },
    created() {
        this.getPurchasesData();
    }
}
</script>
<style scoped>

</style>