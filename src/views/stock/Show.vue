<template>
    <div class="stock-show-page">
        <div>
            <h4>{{stockData.number}}</h4>
            <h5>{{stockData.comment}}</h5>
            <ul>
                <li v-for="(chart, index) in stockData.chart" :key="index">
                    <img :src="chart.url" alt="">
                </li>
            </ul>
            
        </div>
        <router-link :to="{name: 'StockEdit', params: {id: $route.params.id}}">Edit</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            stockData: ''
        }
    },
    created() {
        this.getStockData();
    },
    methods: {
        getStockData() {
            this.axios.get(this.GLOBAL.baseUrl + '/stock/' + this.$route.params.id)
            .then(res => {
                this.stockData = res.data;
            })
            .catch( err => alert(err))
        }
    }
}
</script>
<style scoped>
.stock-show-page{
    text-align: center;
    padding-top: 30px;
}
.stock-show-page ul li{
    list-style: none;
    border: 1px solid red;
}
.stock-show-page img{
    max-width: 100%;
}
.stock-show-page ul{
    padding: 0;
}
</style>