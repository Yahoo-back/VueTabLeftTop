<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    .main .single-page-con {
			background: #fff;
    }
    .el-dialog {
      width: 60%;
    }
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        渠道缩量
      </p>
      <Row>
        <div class="demo-input-suffix">
          渠道名称：
          <el-select v-model="source" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option v-for="item in rows" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
          </el-select>
					<!-- <Select v-model="status" style="width:100px">
            <Option v-for="item in city" :label="item.label" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          缩量百分比：
          <el-input placeholder="请输入缩量百分比" style="width: 180px" v-model="sl" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
					缩量操作时间：
          <el-date-picker v-model="update_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
					<el-button @click="handleAdd()" type="primary" size="small" style="margin-left: 20px">新增渠道缩量</el-button>
					<el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button>
				</div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="historyData"
          border
          style="width: 100%; align: center">
          <el-table-column
            fixed="left"
            label="序号"
            type="index"
						align="center"
						width="80px">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="source"
            sortable
						align="center"
            label="缩量名称">
          </el-table-column>
					<el-table-column
            prop="sl"
            label="缩量百分比"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="update_time"
            sortable
						align="center"
            label="缩量操作时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center">
            <template slot-scope="scope">
              <el-button @click="handleLook(scope.$index, scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
       <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
        <el-form ref="dataForm" :model="dataForm" label-width="160px">
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道名：" prop="userName">
                <template v-if="dialogTitle=='查看渠道缩量'">{{dataForm.userName}}</template>
                <el-input v-else v-model="dataForm.userName" placeholder="渠道名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道账号：" prop="userCode">
                <template v-if="dialogTitle=='查看渠道缩量'">{{dataForm.userCode}}</template>
                <el-input v-else v-model="dataForm.userCode" placeholder="渠道帐号"></el-input>
              </el-form-item>
            </el-col>
          </el-row> 
          <el-row>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道缩量百分比：" prop="sl">
                <template v-if="dialogTitle=='查看渠道缩量'">{{dataForm.sl}}</template>
                <el-input v-else v-model="dataForm.sl" placeholder="渠道缩量百分比"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="10" :lg="12" :xl="12">
              <el-form-item label="渠道缩量更改时间：" prop="update_time">
                <template v-if="dialogTitle=='查看渠道缩量'">{{dataForm.update_time}}</template>
                <el-date-picker v-else v-model="dataForm.update_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <!-- <el-input v-else v-model="dataForm.update_time" placeholder="渠道缩量更改时间"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>   
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <span @click="onDialogSubmit()" v-if="dialogTitle=='查看渠道缩量'"></span>
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
          source: '',
          sl: '',
          update_time: '',
          rows: [
            {
              source: 'android'
            },
            {
              source: 'ios'
            }
          ],
          dataForm: {
            userName: '',
            userCode: '',
            sl: '',
            update_time: '',
          },
          dialogVisibleNo: false,
          dialogVisible: false,
          dialogTitle: '查看渠道缩量',
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
				this.historyData = this.initialProduct =  table.qdSL;
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
        this.ajaxHistoryData = table.qdSL
        this.dataCount = table.qdSL.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.qdSL.length < this.pageSize){
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
      handleView(row) {
        this.$router.push({ path:'/qudao/qudaoSL/qdSLInfo?id='+row.id  })
      },
      //点击编辑弹出对话框dialog
      onDialogClose() {
        this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields()
      },
      //查看渠道缩量
      handleLook(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '查看渠道缩量'
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
      //修改
      handleEdit: function(index, row) {
        this.dialogVisible = true
        this.dialogTitle = '修改渠道缩量'
        this.dataForm.userName = row.userName
        this.dataForm.userCode = row.userCode
        this.dataForm.sl = row.sl
        this.dataForm.update_time = row.update_time
      },

      //添加
      handleAdd(index,row) {
        this.dialogVisible = true
        this.dialogTitle = '新增渠道缩量'
        this.dataForm.userName = ''
        this.dataForm.userCode = ''
        this.dataForm.sl = ''
        this.dataForm.update_time = ''
      },
      onDialogSubmit() {
          
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
