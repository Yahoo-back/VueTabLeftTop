<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        人员管理列表
      </p>
      <Row>
        <div class="demo-input-suffix">       
					登录账号：
          <el-input placeholder="请输入登录账号" style="width: 180px" v-model="user_code" suffix-icon="el-icon-search" clearable />
          员工姓名：
          <el-input placeholder="请输入员工姓名" style="width: 180px" v-model="user_name" suffix-icon="el-icon-search" clearable />
					身份证号：
          <el-input placeholder="请输入身份证号" style="width: 180px" v-model="identity_card" suffix-icon="el-icon-search" clearable />
          性别：
          <Select v-model="sex" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
          状态：
           <Select v-model="status" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="2">在职</Option>
            <Option value="4">离职</Option>
          </Select>
					<el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">新增内部员工</el-button>
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
            label="登录账号">
          </el-table-column>
					<el-table-column
            prop="user_name"
            label="员工姓名"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            sortable
						align="center"
            label="性别">
            <template slot-scope="scope">
              {{scope.row.sex == 0 ? '男' : scope.row.sex == 1 ? '女' : '未知'}}
            </template>
          </el-table-column>
					<el-table-column
            prop="identity_card"
            label="身份证号"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="status"
            sortable
						align="center"
            label="状态">
            <template slot-scope="scope">
              {{scope.row.status == 2 ? '在职' : scope.row.status == 4 ? '离职' : scope.row.status == 0 ? '离职' : '未知'}}
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
              <el-button  @click="handleEdit(scope.$index, scope.row)" type="text" size="small"  v-if="scope.row.status == 2">修改</el-button>
              <el-button @click="dialogVisibleLeave = true" type="text" size="small" v-if="scope.row.status == 2">离职</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleLeave"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该员工离职吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleLeave = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleLeave = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleResume = true" type="text" size="small" v-if="scope.row.status == 0 || scope.row.status == 4">复职</el-button>
               <el-dialog
                title="提示"
                :visible.sync="dialogVisibleResume"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该员工复职吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleResume = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleResume = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="handleDistribute(scope.row)" type="text" size="small" v-if="scope.row.status == 2">分配岗位</el-button>
              <el-button @click="dialogVisibleDown = true" type="text" size="small" v-if="scope.row.status == 2">重置密码</el-button>
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
              <!-- <el-button @click="dialogVisibleDelete = true" type="text" size="small">删除</el-button>
               <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDelete"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将删除该商品吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDelete = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleDelete = false">确 定</el-button>
                </span>
              </el-dialog> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
        <el-form ref="dataForm" :model="dataForm" label-width="80px">
          <el-form-item label="条件名称" prop="dictDesc">
            <template v-if="dialogTitle=='查看'">{{dataForm.dictDesc}}</template>
            <el-input v-else v-model="dataForm.dictDesc" placeholder="条件名称"></el-input>
          </el-form-item>
          <el-form-item label="值1" prop="itemValue">
            <template v-if="dialogTitle=='查看'">{{dataForm.itemValue}}</template>
            <el-input v-else v-model="dataForm.itemValue" placeholder="值1"></el-input>
          </el-form-item>
          <el-form-item label="值2" prop="itemKey">
            <template v-if="dialogTitle=='查看'">{{dataForm.itemKey}}</template>
            <el-input v-else v-model="dataForm.itemKey" placeholder="值2"></el-input>
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
          dataForm: {
            dictDesc: '',
            itemKey: '',
            itemValue: '',
          },
          dialogVisible: false,
          dialogTitle: '查看',
          user_code: '',
          user_name: '',
          sex: '',
          identity_card: '',
          status: '',
          dialogVisibleLeave: false,
          dialogVisibleResume: false,
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
				this.historyData = this.initialProduct =  table.people;
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
        this.ajaxHistoryData = table.people
        this.dataCount = table.people.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.people.length < this.pageSize){
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
        this.$router.push({ path:'/rightManage/people/peopleInfo'  })
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
        this.dialogTitle = '查看'
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
        this.dialogTitle = '修改'
      },
      onDialogSubmit() {
          
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
