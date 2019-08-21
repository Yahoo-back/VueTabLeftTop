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
        点击来源数据统计
      </p>
      <Row>
        <div class="demo-input-suffix">
           来源：
          <Select v-model="source" style="width:100px">
            <Option v-for="item in rows" :label="item.source" :value="item.source" :key="item.source">{{ item.source }}</Option>
          </Select>
        	请选择日期:
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
            prop="source"
            sortable
						align="center"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="uv"
            sortable
						align="center"
            label="点击">
          </el-table-column>
          <el-table-column
            prop="count"
            sortable
						align="center"
            label="验证码注册">
          </el-table-column>
          <el-table-column
            prop="none"
            sortable
						align="center"
            label="未认证">
          </el-table-column>
          <el-table-column
            prop="face"
            sortable
						align="center"
            label="身份证">
          </el-table-column>
          <el-table-column
            prop="per"
            sortable
						align="center"
            label="借款信息">
          </el-table-column>
          <el-table-column
            prop="concat"
            sortable
						align="center"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="bank"
            sortable
						align="center"
            label="银行卡">
          </el-table-column>
					<el-table-column
            prop="pay"
            label="支付"
            sortable
						align="center">
          </el-table-column>
        </el-table>
      </div>
			<!-- <Table :columns="historyColumns" :data="historyData" class="table"></Table> -->
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
		</Card>
    <Card style="margin-top: 300px">
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        点击来源数据统计
      </p>
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
            prop="source"
            sortable
						align="center"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="uv"
            sortable
						align="center"
            label="点击">
          </el-table-column>
          <el-table-column
            prop="count"
            sortable
						align="center"
            label="验证码注册">
          </el-table-column>
          <el-table-column
            prop="none"
            sortable
						align="center"
            label="未认证">
          </el-table-column>
          <el-table-column
            prop="face"
            sortable
						align="center"
            label="身份证">
          </el-table-column>
          <el-table-column
            prop="per"
            sortable
						align="center"
            label="借款信息">
          </el-table-column>
          <el-table-column
            prop="concat"
            sortable
						align="center"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="bank"
            sortable
						align="center"
            label="银行卡">
          </el-table-column>
					<el-table-column
            prop="pay"
            label="支付"
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
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          dialogVisibleNo: false,
          createTime: '',
          source: '',
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
				this.historyData = this.initialProduct =  table.sourceList;
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
        this.ajaxHistoryData = table.sourceList
        this.dataCount = table.sourceList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.sourceList.length < this.pageSize){
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
