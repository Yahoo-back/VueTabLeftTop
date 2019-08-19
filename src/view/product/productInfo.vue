<template>
	<el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">商品详情</span>
      <div class="operation">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="reback">取消</el-button> 
      </div>  
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item style="font-size: 18px" title="基本信息" name="1">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="商品名称">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="logo">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- <el-switch v-model="form.delivery"></el-switch> -->
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="现金贷" value="shanghai"></el-option>
              <el-option label="借条" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="利息">
                <el-input v-model="form.lixi">
                  <template slot="append">%</template>
                </el-input>            
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="10" :lg="12" :xl="12">
              <el-form-item label="可授信额度">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="500-2000" value="shanghai"></el-option>
                  <el-option label="2000-5000" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="分期方式">
                <el-radio-group v-model="form.resource">
                  <el-radio label="按天"></el-radio>
                  <el-radio label="按月"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
              <el-form-item label="可分期期数">
                <el-input type="text" v-model="form.lixi">
                  <template slot="append">天/月（多个请用逗号隔开）</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="链接">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="结算方式">
            <el-checkbox-group v-model="form.type">
              <el-row>
                <el-col :xs="4" :sm="6" :md="8" :lg="1" :xl="12">
                  <el-checkbox label="CPA" name="type"></el-checkbox>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="2" :xl="12">
                  <el-input v-model="form.lixi"></el-input>
                </el-col>
              </el-row>      
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="结算周期">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="申请条件">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="年满18周岁" name="type"></el-checkbox>
              <el-checkbox label="手机本人实名6个月以上" name="type"></el-checkbox>
              <el-checkbox label="芝麻分580" name="type"></el-checkbox>
              <el-checkbox label="18-40周岁" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="申请资料">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="身份证" name="type"></el-checkbox>
              <el-checkbox label="银行卡" name="type"></el-checkbox>
              <el-checkbox label="手机号" name="type"></el-checkbox>
              <el-checkbox label="芝麻分" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="费用说明">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="上架" value="shanghai"></el-option>
              <el-option label="下架" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首页热门">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="是" value="shanghai"></el-option>
              <el-option label="否" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="后台链接">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="后台登陆用户名">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="产品联系人">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="商品描述（申请攻略）" name="2">
        <mavon-editor v-model="context" :toolbars="toolbars" @keydown="" />
      </el-collapse-item>
    </el-collapse>
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
