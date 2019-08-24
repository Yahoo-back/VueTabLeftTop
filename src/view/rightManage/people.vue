<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
		// 产品访问数据统计
		.main .single-page-con {
			background: #fff;
    }
    // .el-input__inner {
    //   height: 32px;
    //   line-height: 32px;
    // }
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
          <el-input placeholder="请输入登录账号" style="width: 160px" v-model="user_code" suffix-icon="el-icon-search" clearable />
          员工姓名：
          <el-input placeholder="请输入员工姓名" style="width: 160px" v-model="user_name" suffix-icon="el-icon-search" clearable />
					身份证号：
          <el-input placeholder="请输入身份证号" style="width: 160px" v-model="identity_card" suffix-icon="el-icon-search" clearable />
          性别：
          <el-select v-model="sex" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="男" value="0">男</el-option>
            <el-option label="女" value="1">女</el-option>
          </el-select>
          <!-- <Select v-model="sex" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select> -->
          状态：
          <el-select v-model="status" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="在职" value="2">在职</el-option>
            <el-option label="离职" value="4">离职</el-option>
          </el-select>
           <!-- <Select v-model="status" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="2">在职</Option>
            <Option value="4">离职</Option>
          </Select> -->
					<el-button  @click="handleAdd()" type="primary" size="small" style="margin-left: 20px">新增内部员工</el-button>
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
              <!-- 查看界面跳转 -->
              <!-- <el-button @click="handleView" type="text" size="small">查看</el-button> -->
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
                <template v-if="dialogTitle=='查看'">{{dataForm.userName}}</template>
                <el-input v-else v-model="dataForm.userName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="登录账号：">
                <template v-if="dialogTitle=='查看'">{{dataForm.userCode}}</template>
                <el-input v-else v-model="dataForm.userCode" placeholder="登录帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">  
              <el-form-item label="性别：" >
                <template v-if="dialogTitle=='查看'">{{dataForm.sex == "0" ? "男" : dataForm.sex == "1" ? "女" : "未知"}}</template>
                <el-select  v-else v-model="dataForm.sex" placeholder="请选择">
                  <el-option label="男" value="0">男</el-option>
                  <el-option label="女" value="1">女</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="身份证：" prop="identityCard">
                <template v-if="dialogTitle=='查看'">{{dataForm.identityCard}}</template>
                <el-input v-else v-model="dataForm.identityCard" placeholder="身份证"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="工号：">
                <template v-if="dialogTitle=='查看'">{{dataForm.jobNum}}</template>
                <el-input v-else v-model="dataForm.jobNum" placeholder="工号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>   
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="学历：" prop="degree">
                <template v-if="dialogTitle=='查看'">{{dataForm.degree == "0" ? "本科以上" : dataForm.degree == "1" ? "本科" :  dataForm.degree == "2" ? "大专" : dataForm.degree == "3" ? "高中" : dataForm.degree == "4" ? "初中" : "未知" }}</template>
                <el-select  v-else v-model="dataForm.degree" placeholder="请选择">
                  <el-option label="本科以上" value="0">本科以上</el-option>
                  <el-option label="本科" value="1">本科</el-option>
                  <el-option label="大专" value="2">大专</el-option>
                  <el-option label="高中" value="3">高中</el-option>
                  <el-option label="初中" value="4">初中</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="电话：">
                <template v-if="dialogTitle=='查看'">{{dataForm.phone}}</template>
                <el-input v-else v-model="dataForm.phone" placeholder="电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>  
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="公司邮箱：" prop="companyEmail">
                <template v-if="dialogTitle=='查看'">{{dataForm.companyEmail}}</template>
                <el-input v-else v-model="dataForm.companyEmail" placeholder="公司邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="个人邮箱：">
                <template v-if="dialogTitle=='查看'">{{dataForm.personalEmail}}</template>
                <el-input v-else v-model="dataForm.personalEmail" placeholder="个人邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="QQ：" prop="qq">
                <template v-if="dialogTitle=='查看'">{{dataForm.qq}}</template>
                <el-input v-else v-model="dataForm.qq" placeholder="QQ"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="微信：">
                <template v-if="dialogTitle=='查看'">{{dataForm.weixin}}</template>
                <el-input v-else v-model="dataForm.weixin" placeholder="微信"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="入职时间：" prop="onjobDate">
                <template v-if="dialogTitle=='查看'">{{dataForm.onjobDate}}</template>
                 <el-date-picker v-else v-model="dataForm.onjobDate"  type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="所属部门：">
                <template v-if="dialogTitle=='查看'">{{dataForm.department}}</template>
                <el-input v-else v-model="dataForm.department" placeholder="所属部门"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-form-item label="家庭住址：" prop="liveAddr">
            <template v-if="dialogTitle=='查看'">{{dataForm.liveAddr}}</template>
            <el-input v-else v-model="dataForm.liveAddr" placeholder="家庭地址"></el-input>
          </el-form-item>
        </el-form>
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
            userCode: '',
            userName: '',
            sex: '',
            degree: '',
            jobNum: '',
            phone: '',
            companyEmail: '',
            personalEmail: '',
            qq: '',
            weixin: '',
            onjobDate: '',
            department: '',
            liveAddr: '',
            identityCard: '',
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
      handleAdd(index,row) {
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
