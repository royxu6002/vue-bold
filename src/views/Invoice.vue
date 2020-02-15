<template>
    <div class="invoice_index container">
        <router-link :to="{name: 'InvoiceCreate'}">Create Invoice</router-link>
        <span>This is index page for invoices</span>
        <div class="invoice-table">
            <table class="table table-hover">
                <tr>
                    <th>id</th>
                    <th>client</th>
                    <th>invoice value</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>ActiveAsia</td>
                    <td>60000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>API Goods Inc</td>
                    <td>6000</td>
                </tr>
            </table>
        </div> 
    </div>
</template>
<script>
</script>
<style lang="stylus">
</style>