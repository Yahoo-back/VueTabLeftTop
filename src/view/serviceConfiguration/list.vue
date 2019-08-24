<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
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
        配置参数
      </p>
      <Row>
        <div class="demo-input-suffix">
          条件名称：
          <el-input placeholder="请输入条件名称" style="width: 180px" v-model="dictDesc" suffix-icon="el-icon-search" clearable />
          值1：
          <el-input placeholder="请输入值1" style="width: 180px" v-model="itemValue" suffix-icon="el-icon-search" clearable />
					值2：
          <el-input placeholder="请输入值2" style="width: 180px" v-model="itemKey" suffix-icon="el-icon-search" clearable />
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
            prop="dictDesc"
            sortable
						align="center"
            label="条件名称">
          </el-table-column>
					<el-table-column
            prop="itemValue"
            label="值1"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="itemKey"
            sortable
						align="center"
            label="值2">
          </el-table-column>
          <el-table-column
            prop="xh"
            sortable
						align="center"
            label="排序">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleLook(scope.$index, scope.row)">查看</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <!-- <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              <el-button  @click="handleView(scope.row)" type="text" size="small">编辑</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
      <el-dialog :append-to-body='true' :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
        <el-form ref="dataForm" :model="dataForm" label-width="80px">
          <el-form-item label="条件名称:" prop="dictDesc">
            <template v-if="dialogTitle=='查看'">{{dataForm.dictDesc}}</template>
            <el-input v-else v-model="dataForm.dictDesc" placeholder="条件名称"></el-input>
          </el-form-item>
          <el-form-item label="值1:" prop="itemValue">
            <template v-if="dialogTitle=='查看'">{{dataForm.itemValue}}</template>
            <el-input v-else v-model="dataForm.itemValue" placeholder="值1"></el-input>
          </el-form-item>
          <el-form-item label="值2:" prop="itemKey">
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
          // 编辑对话框
          dictDesc: '',
          itemKey: '',
          itemValue: '',
          dialogVisible: false,
          dialogTitle: '查看',
          dialogVisibleNo: false,
          dataForm: {
            dictDesc: '',
            itemKey: '',
            itemValue: '',
          },
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
				this.historyData = this.initialProduct =  table.configuration;
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
        this.ajaxHistoryData = table.configuration
        this.dataCount = table.configuration.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.configuration.length < this.pageSize){
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
        this.$router.push({ path:'/serviceConfiguration/list/serviceInfo?id='+row.id  })
      },
      onDialogClose() {
        this.dataForm.tempRoleIds = []
        this.$refs.dataForm.resetFields()
      },
      //点击编辑弹出对话框dialog
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
          this.dialogTitle = '编辑'
        },
        onDialogSubmit() {
          
        }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
