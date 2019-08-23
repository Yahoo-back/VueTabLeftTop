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
        商务合作列表
      </p>
      <Row>
        <div class="demo-input-suffix">
          联系人名称：
				  <el-input placeholder="请输入联系人名称" style="width: 180px" v-model="name" suffix-icon="el-icon-search" clearable />
          联系人手机号：
				  <el-input placeholder="请输入手机号" style="width: 180px" v-model="mobile" suffix-icon="el-icon-search" clearable />
          创建时间:
          <el-date-picker
            v-model="createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
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
            prop="name"
            sortable
						align="center"
            label="联系人名称">
          </el-table-column>
					<el-table-column
            prop="mobile"
            label="联系人手机号"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="reason"
            sortable
						align="center"
            label="联系事由">
          </el-table-column>
					<el-table-column
            prop="create_time"
            label="创建时间"
            sortable
						align="center">
          </el-table-column>
					<el-table-column
            fixed
            prop="remark"
            sortable
						align="center"
            label="备注">
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
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          name: '',
          mobile: '',
          dialogVisibleNo: false,
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
				this.historyData = this.initialProduct =  table.business;
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
        this.ajaxHistoryData = table.business
        this.dataCount = table.business.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.business.length < this.pageSize){
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
        this.$router.push({ path:'/customer/list/customerInfo'  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
