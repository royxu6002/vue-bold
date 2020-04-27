<template>
    <div class="stock-index-page container">
        <div class="row">
            <router-link to="/stock/create">Create</router-link>
        </div>
        <div class="stock-container">
            <div class="row" >
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in stocksData" :key="index">
                        <td><router-link :to="{name: 'StockShow', params: {id: data.id}}">
                    {{data.number}}
                </router-link></td>
                        <td><img :src="data.chart[0].url" alt=""></td>
                        <td>{{data.comment}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "StockIndex",
    data() {
        return {
            stocksData: ''
        }
    },
    methods: {
        getStocksData() {
            this.axios.get(this.GLOBAL.baseUrl+ '/stock')
            .then(res => {
                // window.console.log(res.data);
                this.stocksData = res.data;
            })
            .catch( err => alert(err))
        }
    },
    created() {
        this.getStocksData();
    }

}
</script>
<style scoped>
.stock-container .row{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.stock-container img {
    max-width: 100%;
    width: 500px;
}
</style>