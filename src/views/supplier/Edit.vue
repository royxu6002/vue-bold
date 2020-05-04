<template>
    <div class="supplier-edit-page container mt-3">
        <h6>this is supplier edit page</h6>
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
            <button @click="submitData()">Update profile</button>

        </div>
    </div>
</template>
<script>
export default {
    name: "SupplierEdit",
    data() {
        return {
            supplierData: {

            }
        }
    },
    methods: {
        getSupplierData() {
            this.axios.get(this.GLOBAL.baseUrl+"/supplier/"+this.$route.params.id)
            .then(res => this.supplierData = res.data)
            .catch(err => alert(err))
        },
        submitData() {
            this.axios.put(this.GLOBAL.baseUrl+"/supplier/"+this.$route.params.id, this.qs.stringify(this.supplierData))
            .then(res => {
                // window.console.log(res.data);
                alert(res.data.msg);
                this.$router.push("/supplier/index");
            })
            .catch(err => alert(err))
        }
    },
    created() {
        this.getSupplierData();
    }
}
</script>
<style scoped>
.supplier-edit-page{
    text-align: center;
}
.two-column{
    display: flex;
    justify-content: space-between;
}
</style>