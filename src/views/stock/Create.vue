<template>
    
    <div class="stock-create-page container">
        <h4>创建股票图谱</h4>
        <div class="create-block">
            <form @submit.prevent="onSubmit()" >
                <div class="form-group">
                    <label for="">代码</label>
                    <input type="text" placeholder="stock code" v-model="form.number" name="number">
                </div>

                <div class="form-group" v-if="form.fileList.length>0">
                    <ul>
                        <li v-for="(item, index) in form.fileList" :key="index">
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
    name: "StockCreate",
    data() {
      return {
          form: {
              number: '',
              fileList: [
              ],
              comment: ''
          }
      }
            
    },
    methods: {
        addUploader() {
            this.form.fileList.push({});
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
                this.form.fileList.push(res.data);
                // 清除下 input 数据

            })
            .catch(err => window.console.log(err))
        },
        // 再写一个方法用来删除 form.fileList 中数据;
        deleteImage(ind, name) {
            this.form.fileList.splice(ind, 1);
            this.axios.delete(this.GLOBAL.baseUrl + "/upload/" + name)
            .then((res) => { 
                alert(res.data.msg);

            })
            .catch(err => alert(err))
            
        },
      onSubmit() {
        this.axios.post(this.GLOBAL.baseUrl + '/stock', this.qs.stringify(this.form))
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
.stock-create-page{
    padding: 30px 20px;
    text-align: center;
}
.stock-create-page h4 {
    margin-bottom: 30px;
}
.create-block{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 30px 20px 20px;
}
.create-block .text-area {
    display: flex;
    align-items: center;
    justify-content: center;
}
.create-block form ul li {
    list-style: none;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;

}
</style>