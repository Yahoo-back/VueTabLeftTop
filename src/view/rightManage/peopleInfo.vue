<template>
	<el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">员工信息</span>
      <div class="operation">
        <el-button @click="reback">关闭</el-button> 
      </div>  
    </div>
      <el-form ref="form" :model="form" label-width="150px">
				<el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="登录账号">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
        </el-row>   
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">   
						<el-form-item label="性别">  
							<el-select v-model="form.region" placeholder="请选择">
              <el-option label="男" value="shanghai"></el-option>
              <el-option label="女" value="beijing"></el-option>
            </el-select>
						</el-form-item>
						
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="身份证">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="工号">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="学历">
							<el-select v-model="form.region" placeholder="请选择">
              <el-option label="研究生" value="shanghai"></el-option>
              <el-option label="本科" value="beijing"></el-option>
            </el-select>
          	</el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="电话">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
        </el-row>  
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="公司邮箱">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="个人邮箱">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
				</el-row>
				<el-row>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="QQ">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
            <el-form-item label="微信">
              <el-input v-model="form.name"></el-input>
          	</el-form-item>
          </el-col>
        </el-row>   
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="入职时间">
							<el-date-picker
								v-model="value1"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
						<el-form-item label="所属部门">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :xs="4" :sm="6" :md="8" :lg="12" :xl="12">
						<el-form-item label="家庭住址">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-button style="float: right; margin-bottom: 20px" @click="reback">关闭</el-button> 
        </el-form>
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
					value1: '',
          form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
          imageUrl: '',
          activeNames: ['1'],
          context: '',
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            mark: true, // 标记
            superscript: true, // 上角标
            quote: true, // 引用
            ol: true, // 有序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            help: true, // 帮助
            code: true, // code
            subfield: true, // 是否需要分栏
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            /* 1.3.5 */
            undo: true, // 上一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true // 导航目录
          }
        }
		},
		methods: {
      //Collapse折叠面板
      handleChange(val) {
      },
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
