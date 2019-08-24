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
        客户列表
      </p>
      <Row>
        <div class="demo-input-suffix">
          手机号：
          <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="mobile" icon="search" placeholder="请输入手机号" style="width: 180px" /> -->
          姓名：
          <el-input placeholder="请输入姓名" style="width: 180px" v-model="user_name" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="user_name" icon="search" placeholder="请输入姓名" style="width: 180px" /> -->
					身份证号：
          <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="id_card" icon="search" placeholder="请输入身份证号" style="width: 180px" /> -->
					银行卡号：
          <el-input placeholder="请输入银行卡号" style="width: 180px" v-model="bank_card" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="bank_card" icon="search" placeholder="请输入银行卡号" style="width: 180px" /> -->
					注册时间:
          <el-date-picker
            v-model="create_time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          来源：
          <el-select v-model="source" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option v-for="item in rows" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</el-option>
          </el-select>
          <!-- <Select v-model="source" style="width:100px">
            <Option v-for="item in rows" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</Option>
          </Select> -->
					 状态：
          <el-select v-model="status" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="正常" value="0">正常</el-option>
            <el-option label="禁用" value="1">禁用</el-option>
          </el-select>
          <!-- <Select v-model="status" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">正常</Option>
            <Option value="1">禁用</Option>
          </Select> -->
          认证状态：
          <el-select v-model="user_auth" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="未认证" value="0">未认证</el-option>
            <el-option label="身份证" value="1">身份证</el-option>
            <el-option label="借款信息" value="2">借款信息</el-option>
            <el-option label="联系人" value="3">联系人</el-option>
            <el-option label="银行卡" value="4">银行卡</el-option>
          </el-select>
          <!-- <Select v-model="user_auth" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">未认证</Option>
            <Option value="1">身份证</Option>
            <Option value="2">借款信息</Option>
            <Option value="3">联系人</Option>
            <Option value="4">银行卡</Option>
          </Select>         -->
          <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          <!-- <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">新增客户</el-button> -->
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
            width="80">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="mobile"
            sortable
						align="center"
            label="手机号"
            width="150">
          </el-table-column>
					<el-table-column
            prop="create_time"
            label="注册时间"
            sortable
						align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="source"
            sortable
						align="center"
            label="来源"
            width="150">
          </el-table-column>
          <el-table-column
            prop="user_name"
            sortable
						align="center"
            label="姓名"
            width="240">
          </el-table-column>
					<el-table-column
            prop="id_card"
            sortable
						align="center"
            label="身份证号"
            width="240">
          </el-table-column>
          <el-table-column
            prop="bank_card"
            sortable
						align="center"
            label="银行卡号"
            width="240">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="认证状态"
						align="center"
            sortable
            width="120">
            <template slot-scope="scope">
              {{scope.row.user_auth == '活体' ? '身份证' : scope.row.user_auth == '借款信息' ? '借款信息' : scope.row.user_auth == '联系人' ? '联系人' : scope.row.user_auth == '银行卡' ? '银行卡' : '未认证'}}
            </template>
          </el-table-column>
					<el-table-column
            prop="pay_amt"
            sortable
						align="center"
            label="已支付金额"
            width="240">
          </el-table-column>
          <el-table-column
            label="状态"
						align="center"
            sortable
            width="120">
            <template slot-scope="scope">
              {{scope.status == 0 ? '正常' : scope.status == 1 ? '禁用' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
						align="center"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="dialogVisibleNo = true" type="text" size="small">禁用</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleNo"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要禁用该用户吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleNo = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleNo = false">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
			 <div style="margin-top: 200px">
         	<p slot="title">
            <Icon type="help-buoy"></Icon>
              金额统计
          </p>
          <el-table
            :data="money"
            border
            style="width: 100%">
            <el-table-column
              fixed
              align="center"
              prop="pay_amt"
              sortable
              label="今日支付金额">
            </el-table-column>
            <el-table-column
              prop="pay_time"
              label="总支付金额"
              align="center"
              sortable>
            </el-table-column>
          </el-table>
      </div>
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
          status: '',
          mobile: '',
          create_time: '',
          source: '',
          user_name: '',
          id_card: '',
          bank_card: '',
          user_auth: '',
          dialogVisibleNo: false,
          createTime: '',
          rows: [
            {
              source: 'android'
            },
            {
              source: 'ios'
            }
          ],
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
          money: [
            {
              pay_amt: '0.01',
              pay_time: '0'
            }
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
        this.historyData = this.initialProduct =  table.customerList;
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
        this.ajaxHistoryData = table.customerList;
        this.dataCount = table.customerList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.customerList.length < this.pageSize){
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
        this.$router.push({ path:'/customer/list/customerInfo?id='+row.id  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
