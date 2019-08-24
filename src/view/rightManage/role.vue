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
        角色列表
      </p>
      <Row>
        <div class="demo-input-suffix">       
					角色ID：
          <el-input placeholder="请输入角色ID" style="width: 160px" v-model="roleId" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入联系人名称" style="width: 180px" /> -->
          角色代码：
          <el-input placeholder="请输入角色代码" style="width: 160px" v-model="roleCode" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入联系人名称" style="width: 180px" /> -->
					角色名称：
          <el-input placeholder="请输入角色名称" style="width: 160px" v-model="roleName" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入手机号" style="width: 180px" /> -->
          <el-button  @click="handleAdd()"  type="primary" size="small" style="margin-left: 20px">新增</el-button>
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
            prop="roleId"
            sortable
						align="center"
            label="角色ID">
          </el-table-column>
					<el-table-column
            prop="roleCode"
            label="角色代码"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="roleName"
            sortable
						align="center"
            label="角色名称">
          </el-table-column>
					<el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="320">
            <template slot-scope="scope">
              <el-button  @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="dialogVisibleDelete = true" type="text" size="small">删除</el-button>
               <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDelete"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将删除该角色吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDelete = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleDelete = false">确 定</el-button>
                </span>
              </el-dialog>
							<el-button @click="handleView(scope.row)" type="text" size="small">分配菜单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
        <el-form ref="dataForm" :model="dataForm" label-width="80px">
          <el-form-item label="角色代码:" prop="roleCode">
            <el-input v-model="dataForm.roleCode" placeholder="角色代码"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" prop="roleName">
            <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='查看'"></span>
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
          roleId: '',
          roleCode: '',
          roleName: '',
          dialogVisible: false,
          dialogTitle: '修改',
					dialogVisibleNo: false,
					dialogVisibleSale: false,
          dialogVisibleUp: false,
          dialogVisibleDown: false,
          dialogVisibleDelete: false,
          createTime: '',
          createTime: '',
          dataForm: {
            roleCode: '',
            roleName: '',
          },
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
				this.historyData = this.initialProduct =  table.role;
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
        this.ajaxHistoryData = table.role
        this.dataCount = table.role.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.role.length < this.pageSize){
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
        this.$router.push({ path:'/rightManage/role/roleInfo'})
      },
       //点击编辑弹出对话框dialog
      onDialogClose() {
        this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields()
      },
      // handleLook(index, row) {
      //   this.dialogVisible = true
      //   this.dialogTitle = '查看'
      //   this.dataForm.tempRoleIds = []
      //   for (let x of Object.keys(this.dataForm)) {
      //     if (
      //       x === 'tempRoleIds' &&
      //       typeof row.roleList === 'object' &&
      //       row.roleList.length > 0
      //     ) {
      //       for (let item of row.roleList) {
      //         this.dataForm.tempRoleIds.push(item.id)
      //       }
      //     } else {
      //       this.dataForm[x] = row[x]
      //       }
      //   }
      // },
      handleEdit(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '修改'
      },
      handleAdd(index,row){
        this.dialogVisible = true
        this.dialogTitle = '新增'
      },
      onDialogSubmit() {
          
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
