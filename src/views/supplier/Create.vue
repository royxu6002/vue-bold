<template>
    <div class="supplier-create-page container mt-3">
        <h6>this is supplier create page</h6>
        <div class="col-6 col-md-12 col-sm-12" style="margin: 0 auto">
            <div class="two-column">
                <small>Name</small>
                <input type="text" v-model="supplierData.name">
            </div>
            <div class="two-column">
                 <small>Address</small>
                <input type="text" v-model="supplierData.address">
            </div>
            <div class="two-column"><small>License</small><input type="text" v-model="supplierData.business_license"></div>
            <div class="two-column">
                <small>Tel</small>
                <input type="text" v-model="supplierData.tel">
            </div>
            <div class="two-column"><small>Fax</small><input type="text" v-model="supplierData.fax"></div>
            <div class="two-column"><small>Facotory rate</small><input type="text" v-model="supplierData.factory_tax_rate"></div>
            <div class="two-column"><small>Owner</small><input type="text" v-model="supplierData.legal_person"></div>
            <div class="two-column"><small>Contact</small><input type="text" v-model="supplierData.contact_person"></div>
            <div class="two-column"><small>Mobile</small><input type="text" v-model="supplierData.mobile"></div>
            <div class="two-column"><small>Alternative contact</small>
            <textarea name="" id="" rows="3" v-model="supplierData.alternative_contact"></textarea>
            </div>
            <button @click="submitData()">Create</button>

        </div>
    </div>
</template>
<script>
export default {
    name: "SupplierCreate",
    data() {
        return {
            supplierData: {

            }
        }
    },
    methods: {
        submitData() {
            this.axios.post(this.GLOBAL.baseUrl+"/supplier", this.qs.stringify(this.supplierData))
            .then(res => {
                // window.console.log(res.data);
                alert(res.data.msg);
            })
            .catch(err => alert(err))
        }
    }
}
</script>
<style scoped>
.supplier-create-page{
    text-align: center;
}
.two-column{
    display: flex;
    justify-content: space-between;
}
</style>