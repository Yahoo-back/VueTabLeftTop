<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
		}
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        渠道注册列表
      </p>
      <Row>
        <div class="demo-input-suffix">       
					渠道账号：
          <el-input placeholder="请输入渠道账号" style="width: 180px" v-model="user_code" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入联系人名称" style="width: 180px" /> -->
          渠道姓名：
          <el-input placeholder="请输入渠道姓名" style="width: 180px" v-model="user_name" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入联系人名称" style="width: 180px" /> -->
					H5Uvurl：
          <el-input placeholder="请输入H5Uvurl" style="width: 180px" v-model="uvurl" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入手机号" style="width: 180px" /> -->
          状态：
          <el-select v-model="status" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="在职" value="2">在职</el-option>
            <el-option label="离职" value="4">离职</el-option>
          </el-select>
					<el-button @click="handleAdd()"  type="primary" size="small" style="margin-left: 20px">新增渠道商</el-button>
					<el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="historyData"
          border
          style="width: 100%; align: center">
          <el-table-column
            label="序号"
            type="index"
						align="center"
						width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="user_code"
            sortable
						align="center"
            label="渠道账号">
          </el-table-column>
					<el-table-column
            prop="user_name"
            label="渠道名称"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="uvurl"
            sortable
						align="center"
            label="H5Uvurl">
          </el-table-column>
					<el-table-column
            prop="status"
            label="状态"
            sortable
						align="center">
            <template slot-scope="scope">
              {{scope.row.status == 2 ? '在职' : scope.row.status == 4 ? '离职' : '未知'}}
            </template>
          </el-table-column>
					 <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="320">
            <template slot-scope="scope">
              <el-button @click="handleLook(scope.$index, scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="dialogVisibleSale = true" type="text" size="small">离职</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleSale"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该员工离职吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleSale = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleSale = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="handleDistribute(scope.row)" type="text" size="small">分配岗位</el-button>
              <el-button @click="dialogVisibleDown = true" type="text" size="small">重置密码</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDown"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要重置密码吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDown = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleDown = false">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
		  <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
        <el-form ref="dataForm" :model="dataForm" label-width="100px">
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="姓名：">
                <template v-if="dialogTitle=='查看渠道商'">{{dataForm.userName}}</template>
                <el-input v-else v-model="dataForm.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="登录账号：">
                <template v-if="dialogTitle=='查看渠道商'">{{dataForm.userCode}}</template>
                <el-input v-else v-model="dataForm.userCode" placeholder="登录帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="金额：" prop="cpa">
                <template v-if="dialogTitle=='查看渠道商'">{{dataForm.cpa}}</template>
                <el-input v-else v-model="dataForm.cpa" placeholder="金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="2" :lg="12" :xl="12">
              <el-form-item label="CPA：" prop="cpaType">
                <template v-if="dialogTitle=='查看渠道商'">{{dataForm.cpaType}}</template>
                <el-select v-model="cpaType" placeholder="请选择" style="width:100px">
                  <el-option  value="">请选择</el-option>
                  <el-option label="uv" value="0">uv</el-option>
                  <el-option label="注册" value="1">注册</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="放款率：">
                <template v-if="dialogTitle=='查看渠道商'">{{dataForm.loanRate}}</template>
                <el-input v-else v-model="dataForm.loanRate" placeholder="放款率"></el-input>
              </el-form-item>
            </el-col>
          </el-row>   
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='查看渠道商'"></span>
          <el-button type="primary" @click="onDialogSubmit()" v-else>保存</el-button>
        </div>
      </el-dialog>
    </Card>
  </div>
</template>
<style scoped>
  .paging{
    float:right;
    margin-top:30px;
	}
	.table{
		margin-top: 30px;
	}
</style>
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          user_code: '',
          user_name: '',
          uvurl: '',
          status: '',
          dataForm: {
            userCode: '',
            userName: '',
            cpa: '',
            cpaType: '0',
            loanRate: ''
          },
          dialogVisible: false,
          dialogTitle: '查看渠道商',
					dialogVisibleNo: false,
					dialogVisibleSale: false,
          dialogVisibleUp: false,
          dialogVisibleDown: false,
          dialogVisibleDelete: false,
          createTime: '',
          createTime: '',
          city : [
            {
              value: 'beijing',
              label: '北京市'
            },
            {
              value: 'shanghai',
              label: '上海市'
            },
            {
              value: 'shenzhen',
              label: '深圳市'
            },
          ],
          status: '',
          status1: '',
          searchProductName: '',
          // historyColumns: table.historyColumns,
          historyData: [],
          initialProduct: [],
          ajaxHistoryData:[],
          // 初始化信息总条数
          dataCount:0,
          // 每页显示多少条
          pageSize:10,
        }
    },
    methods:{
			init () {
				this.historyData = this.initialProduct =  table.qdRegister;
				this.status1 = table.status1;
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 获取历史记录信息
      handleListApproveHistory(){
        // 保存取到的所有数据
        this.ajaxHistoryData = table.qdRegister
        this.dataCount = table.qdRegister.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.qdRegister.length < this.pageSize){
          this.historyData = this.ajaxHistoryData;
        }else{
          this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      },
      changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
			},
			handleSearchProductName() {
				this.historyData = this.initialProduct;
        this.historyData = this.search(this.historyData, {name: this.searchProductName});
      },
      handleView() {
        this.$router.push({ path:'/qudao/qudaoRegister/qdRegisterInfo'  })
			},
			handleDistribute() {
        this.$router.push({ path:'/rightManage/people/distributionPosts'  })
      },
      //点击编辑弹出对话框dialog
      onDialogClose() {
        this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields()
      },
      handleLook(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '查看渠道商'
        this.dataForm.tempRoleIds = []
        for (let x of Object.keys(this.dataForm)) {
          if (
            x === 'tempRoleIds' &&
            typeof row.roleList === 'object' &&
            row.roleList.length > 0
          ) {
            for (let item of row.roleList) {
              this.dataForm.tempRoleIds.push(item.id)
            }
          } else {
            this.dataForm[x] = row[x]
            }
        }
      },
      handleEdit(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '修改渠道商'
      },
      handleAdd(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '新增渠道商'
      },
      onDialogSubmit() {
          
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
