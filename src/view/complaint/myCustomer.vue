<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        我的客户列表
      </p>
      <Row>
        <div class="demo-input-suffix">
          手机号：
          <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="mobile" icon="search" placeholder="请输入手机号" style="width: 180px" /> -->
          身份证号：
          <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="searchCard" @keyup="getInputValue" @on-change="handleSearchCard" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="historyData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            align="center"
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            prop="mobile"
            sortable
            align="center"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="id_card"
            sortable
            align="center"
            label="身份证号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="create_time"
            sortable
            align="center"
            label="注册时间"
            width="240">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="姓名"
            sortable
            align="center"
            width="180">
          </el-table-column>
           <el-table-column
            prop="bank_card"
            label="银行卡号"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user_auth"
            label="认证状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.row.user_auth == '活体' ? '身份证' : scope.row.user_auth == '借款信息' ? '借款信息' : scope.row.user_auth == '联系人' ? '联系人' : scope.row.user_auth == '银行卡' ? '银行卡' : '未认证'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="pay_amt"
            label="已支付金额"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            align="center"
            width="180">
            <template slot-scope="scope">
              {{scope.status == 0 ? '正常' : scope.status == 1 ? '禁用' : '未知'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="remark"
            label="备注"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="220">
            <template slot-scope="scope">
              <el-button @click="handleView" type="text" size="small">查看</el-button>
              <el-button @click="dialogVisibleSale = true" type="text" size="small" v-if="scope.row.refundstatus == 5">取消跟单</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleSale"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要取消跟单吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleSale = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleSale = false">确 定</el-button>
                </span>
              </el-dialog>
							<el-button @click="handleReback" type="text" size="small" v-if="scope.row.refundstatus == 5">退款</el-button>
							<el-button @click="handleRefuse" type="text" size="small" v-if="scope.row.refundstatus == 5">驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
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
<style lang="less">
	.main .single-page-con {
			background: #fff;
		}
</style>
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          mobile: '',
          id_card: '',
          dialogVisibleSale: false,
          dialogVisibleUp: false,
          dialogVisibleDown: false,
          dialogVisibleDelete: false,
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
					searchCard: '',
					searchMobile: '',
					isOk: false,
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
			getInputValue() {
				this.searchMobile.length >=1 ? this.isOk=true : this.isOk = false;
			},
			init () {
				this.historyData = this.initialProduct =  table.myCustomer;
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
        this.ajaxHistoryData = table.myCustomer;
        this.dataCount = table.myCustomer.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.myCustomer.length < this.pageSize){
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
			handleSearchMobile() {
				// this.historyData = this.initialProduct;
        // this.historyData = this.search(this.historyData, {name: this.searchProductName});
			},
			handleSearchCard() {
				// this.historyData = this.initialProduct;
        // this.historyData = this.search(this.historyData, {name: this.searchProductName});
      },
      handleView() {
        this.$router.push({ path:'/complaint/myCustomer/myCustomerInfo'  })
      },
      handleReback() {
        this.$router.push({ path:'/complaint/myCustomer/myReback'  })
      },
      handleRefuse() {
        this.$router.push({ path:'/complaint/myCustomer/myRefuse'  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
