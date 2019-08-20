<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        客服业绩统计
      </p>
      <Row>
        <div class="demo-input-suffix">
          请选择时间：
					<el-date-picker
            v-model="createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
				  <!-- <Input v-model="searchMobile" @keyup="getInputValue" @on-change="handleSearchMobile" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          姓名：
				  <Input v-model="searchCard" @keyup="getInputValue" @on-change="handleSearchCard" icon="search" placeholder="请输入商品名称" style="width: 180px" />
          <el-button  @click="handleView" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          <!-- <el-button  @click="handleView" type="primary" size="small" style="margin-left: 20px">新增商品</el-button> -->
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
            prop="name"
            sortable
            align="center"
            label="人员">
          </el-table-column>
          <el-table-column
            prop="classify"
            sortable
            align="center"
            label="跟单量">
          </el-table-column>
          <el-table-column
            prop="link"
            sortable
            align="center"
            label="退款量">
          </el-table-column>
          <el-table-column
            prop="status"
            label="退款率"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="驳回量"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="驳回率"
            sortable
            align="center">
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
				this.historyData = this.initialProduct =  table.productList;
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
        this.ajaxHistoryData = table.productList.histories
        this.dataCount = table.productList.histories.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.productList.histories.length < this.pageSize){
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
