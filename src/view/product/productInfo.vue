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
        <el-form ref="form" :model="form" label-width="140px">
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
            <el-select v-model="form.classify_id" placeholder="请选择" >
              <el-option  value="">请选择</el-option>
              <el-option v-for="item in rows" :label="item.name" :value="item.id" :key="item.name">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="利息">
                <el-input v-model="form.interest">
                  <template slot="append">%</template>
                </el-input>            
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="10" :lg="12" :xl="12">
              <el-form-item label="可授信额度">
                <el-select v-model="form.money" placeholder="请选择">
                  <el-option  value="">请选择</el-option>
                  <el-option v-for="item in money" :label="item.itemValue" :value="item.id" :key="item.itemKey">{{ item.itemValue }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="分期方式">
                <el-radio-group v-model="form.perio_way">
                  <el-radio label="按天" value="0"></el-radio>
                  <el-radio label="按月" value="1"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="8" :xl="12">
              <el-form-item label="可分期期数">
                <el-input type="text" v-model="form.periodization">
                  <template slot="append">天/月（多个请用逗号隔开）</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="链接">
            <el-col :span="8">
              <el-input v-model="form.link"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="结算方式">
            <el-row>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-radio v-model="form.settle_cpa" value="0">CPA</el-radio>
              </el-col>
              <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                <el-input v-model="form.settle_way_cpa"></el-input>
              </el-col>
            </el-row>      
          </el-form-item>
          <el-form-item label="结算周期">
            <el-col :span="8">
              <el-input v-model="form.settle_cycle"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="申请条件">
            <el-checkbox-group v-model="form.apply_require_td">
              <el-checkbox v-for="item in apply_require" :label="item.id" :key="item.itemValue" >{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="申请资料">
            <el-checkbox-group v-model="form.apply_data_td">
              <el-checkbox v-for="item in apply_data" :label="item.id" :key="item.itemValue" >{{item.itemValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="费用说明">
            <el-col :span="8">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="状态">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="上架" value="1"></el-option>
                  <el-option label="下架" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="排序">
                <el-input v-model="form.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="首页热门">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="热门排序">
                <el-input v-model="form.hot_sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="后台链接">
            <el-col :span="8">
              <el-input v-model="form.manager_url"></el-input>
            </el-col>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="后台登陆用户名">
                <el-input v-model="form.manager_user"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="后台登陆用户密码">
                <el-input v-model="form.manager_password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="所属公司">
            <el-col :span="8">
              <el-input v-model="form.company"></el-input>
            </el-col>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="产品联系人">
                <el-input v-model="form.contact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="6" :xl="12">
              <el-form-item label="产品联系人联系方式">
                <el-input v-model="form.contact_info"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="商品描述（申请攻略）" name="2">
        <mavon-editor v-model="description" :toolbars="toolbars" @keydown="" />
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
          classify_id:'',
          interest: '',
          money: '',
          perio_way: '',
          periodization: '',
          link: '',
          settle_cpa: '',
          settle_way_cpa: '',
          settle_cycle: '',
          apply_require_td: '',
          apply_data_td: '',
          ktx_desc: '',
          status: '',
          sort: '',
          is_hot: '',
          hot_sort: '',
          manager_url: '',
          manager_user: '',
          manager_password: '',
          company: '',
          contact: '',
          contact_info: '',
        },
        description: '',
        //分类
        rows: [
            {
              id: 1,
              name: "现金贷"
            },
            {
              id: 2,
              name: "借条"
            }
          ],
          //可授信额度
          money: [
            {
              id: 1,
              itemKey: "0",
              itemValue: "500-2000"
            },
            {
              id: 2,
              itemKey: "0",
              itemValue: "2000-5000"
            }
          ],
          //申请条件
          apply_require: [
            {
              id: 1,
              itemKey: "0",
              itemValue: "年满18岁"
            },
            {
              id: 2,
              itemKey: "0",
              itemValue: "手机本人实名6个月以上"
            }
          ],
          //申请资料
          apply_data: [
            {
              id: 1,
              itemKey: "0",
              itemValue: "身份证"
            },
            {
              id: 2,
              itemKey: "0",
              itemValue: "银行卡"
            }
          ],
          imageUrl: '',
          activeNames: ['1'],
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
