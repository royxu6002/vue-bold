<template>
    <div class="stock-edit-page container">
        <h4>创建股票图谱</h4>
        <div class="edit-block">
            <form @submit.prevent="onSubmit()" >
                <div class="form-group">
                    <label for="">代码</label>
                    <input type="text" placeholder="stock code" v-model="form.number" name="number">
                </div>

                <div class="form-group" v-if="form.chart.length>0">
                    <ul>
                        <li v-for="(item, index) in form.chart" :key="index">
                            <img :src="item.url" alt="" width="200px">
                            <span>{{item.name}} 
                                <small @click="deleteImage(index, item.name)">X</small>
                            </span>
                        </li>
                    </ul>
                </div>
                
                <div class="form-group">
                    <input type="file" placeholder="upload image" @change="uploadImage($event)">
                </div>

                <div class="form-group text-area" >
                    <label for="">评论</label>
                    <textarea rows="3" name="comment" id="" cols="30" v-model="form.comment"></textarea>
                    <!-- <input type="text" placeholder="comment" v-model="form.comment" name="comment"> -->
                </div>

                <div class="form-group">
                    <button type="submit">提交</button>
                </div>
            </form>                
        </div>

    </div>
    
</template>
<script>
export default {
    name: "StockEdit",
    data() {
      return {
          form: {
          }
      }
            
    },
    created() {
        this.getStockData();
    },
    methods: {
        getStockData() {
            this.axios.get(this.GLOBAL.baseUrl+"/stock/"+this.$route.params.id)
            .then(res => this.form = res.data)
            .catch(err => alert(err))
        },
        addUploader() {
            this.form.chart.push({});
        },
        // 这个方法是用来在 form.fileList 中添加数据的;
        uploadImage(e) {
            let formData = new FormData();
            formData.append('image', e.target.files[0]);
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            this.axios.post(this.GLOBAL.baseUrl + "/upload", formData, config)
            .then((res) => { 
                this.form.chart.push(res.data);
                // 清除下 input 数据

            })
            .catch(err => window.console.log(err))
        },
        // 再写一个方法用来删除 form.fileList 中数据;
        deleteImage(ind, name) {
            this.form.chart.splice(ind, 1);
            this.axios.delete(this.GLOBAL.baseUrl + "/upload/" + name)
            .then((res) => { 
                alert(res.data.msg);

            })
            .catch(err => alert(err))
            
        },
      onSubmit() {
        this.axios.put(this.GLOBAL.baseUrl + '/stock/' + this.$route.params.id, this.qs.stringify(this.form))
        .then(res => {
            if(res) alert(res.data.msg);
            this.$router.push('/stock');
        })
        .catch(err => window.console.log(err))
      }
    }
}
</script>
<style scoped>
.stock-edit-page{
    padding: 30px 20px;
    text-align: center;
}
.stock-edit-page h4 {
    margin-bottom: 30px;
}
.edit-block{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 30px 20px 20px;
}
.edit-block .text-area {
    display: flex;
    align-items: center;
    justify-content: center;
}
.edit-block form ul li {
    list-style: none;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;

}
</style>