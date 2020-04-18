<template>
    
    <div class="stock-create-page container">
        <h4>创建股票图谱</h4>
        <div class="create-block">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="股票代码">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>

                <el-upload
                    class="upload-component"
                    action="http://comlibra.com/api/v1/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="form.fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">上传月,周,日,小时图</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

                <el-form-item label="评论">
                    <el-input v-model="form.comment"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>

            </el-form>
        
                
        </div>

    </div>
    
</template>
<script>
export default {
    name: "StockCreate",
    data() {
      return {
        baseUrl: this.GLOBAL.baseUrl + "/upload",
        form: {
            number: '000999',
            fileList: [
                {   
                    name: 'food.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, 
                {   
                    name: 'food2.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],
            comment: 'test paragraph'

        }
      };
    },
    methods: {
      handleRemove(file, fileList) {
        // axios.delete 方法, 调用 UploadContoller@destroy 方法
        // this.axios.delete(this.GLOBAL.baseUrl + "/upload/"+ fileList , file)
        // .then(res => window.console.log(res))
        // .catch(err => alert(err));
        window.console.log(file, fileList);
      },
      handlePreview(file) {
        //axios.post 方法, 调用 UploadController@store 方法
        // this.axios.post(this.GLOBAL.baseUrl + "/upload", file)
        // .then(res => window.console.log(res))
        // .catch(err => alert(err));
        window.console.log(file);
      },
      onSubmit() {
        window.console.log('submit!');
        this.axios.post(this.GLOBAL.baseUrl + '/stock', this.qs.stringify(this.form))
        .then(res => {
            window.console.log(res);
            // alert(res.msg);
        })
        .catch(err => alert(err))
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
.upload-component{
    margin-bottom: 22px;
}
</style>