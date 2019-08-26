<template>
	<el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">退款</span>
    </div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="退款金额">
            <el-col :span="8">
              <el-input v-model="form.money"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款凭证">
            <el-upload
							v-model="form.imageUrl"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
							<el-button type="primary" size="small" v-else>上传图片</el-button>
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
            <!-- <el-switch v-model="form.delivery"></el-switch> -->
          </el-form-item>
        </el-form>
         
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button @click="reback">取消</el-button>   
  </el-card>
</template>

<style scoped>
  .title{
    font-size:20px;
	}
  .operation{
    float: right;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="less">
  .el-collapse-item__header {
    font-size: 15px;
  }
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
  export default {
      data () {
        return {
          form: {
          money: '',
          imageUrl: ''
        },
          imageUrl: '',
        }
		},
		methods: {
      //返回上一界面
			reback(){
				this.$router.go(-1);
      },
      //保存
      onSubmit() {
        console.log('submit!');
      },
      //上传图片
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>
