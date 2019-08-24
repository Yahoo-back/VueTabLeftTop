<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        邮件退款列表
      </p>
      <Row>
        <div class="demo-input-suffix">
          手机号：
          <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile" suffix-icon="el-icon-search" clearable /> 
				  <!-- <Input v-model="searchMobile" @keyup="getInputValue" @on-change="handleSearchMobile" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          身份证号：
          <el-input placeholder="请输入身份证号" style="width: 180px" v-model="id_card" suffix-icon="el-icon-search" clearable /> 
				  <!-- <Input v-model="searchCard" @keyup="getInputValue" @on-change="handleSearchCard" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          银行卡号：
          <el-input placeholder="请输入银行卡号" style="width: 180px" v-model="bank_card" suffix-icon="el-icon-search" clearable /> 
				  <!-- <Input v-model="searchMobile" @keyup="getInputValue" @on-change="handleSearchMobile" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          订单号：
          <el-input placeholder="请输入订单号" style="width: 180px" v-model="request_no" suffix-icon="el-icon-search" clearable /> 
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
            prop="request_no"
            sortable
            align="center"
            label="订单号"
            width="150">
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
          </el-table-column>
          <el-table-column
            prop="pay_amt"
            label="已支付金额"
            sortable
            align="center"
            width="180">
          </el-table-column>
					<el-table-column
            prop="amt"
            label="迅付金额"
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
            width="160">
            <template slot-scope="scope">
              <el-button @click="handleView" type="text" size="small">查看</el-button>
							<el-button @click="handleView" type="text" size="small">退款</el-button>
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
          bank_card: '',
          request_no: '',
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
				this.historyData = this.initialProduct =  table.email;
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
        this.ajaxHistoryData = table.email;
        this.dataCount = table.email.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.email.length < this.pageSize){
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
        this.$router.push({ path:'/product/list/productInfo'  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
