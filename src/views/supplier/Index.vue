<template>
    <div class="container supplier-index-page mt-3">
        <h6>Supplier index page</h6> <router-link to="/supplier/create">Create</router-link>
        <div>
            <table class="table">
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Tel</td>
                    <td>Contact</td>
                    <td>Mobile</td>
                </tr>
                <tr v-for="(su, index) in suppliersData" :key="index">
                    <td>
                        <router-link :to="{name: 'SupplierShow', params: {id: su.id}}">
                            {{su.id}}
                        </router-link>
                    </td>
                    <td>{{su.name}}</td>
                    <td>{{su.tel}}</td>
                    <td>{{su.contact_person}}</td>
                    <td>{{su.mobile}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: "SupplierIndex",
    data() {
        return {
           suppliersData: "" 
        }
    },
    methods: {
        getSuppliersData() {
            this.axios.get(this.GLOBAL.baseUrl+"/supplier")
            .then(res => this.suppliersData = res.data)
            .catch(err => alert(err))
        }
    },
    created() {
        this.getSuppliersData();
    }
}
</script>
<style scoped>

</style>