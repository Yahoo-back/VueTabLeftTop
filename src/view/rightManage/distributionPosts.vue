<style lang="less">
    @import '../../styles/common.less';
    // @import './components/table.less';
    .main .single-page-con {
			background: #fff;
		}
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        角色列表
      </p>
      <Row>
        <div class="demo-input-suffix">
          角色ID：
				  <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" />
          角色名称：
				  <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" />
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
            prop="name"
            sortable
						align="center"
            label="角色ID">
          </el-table-column>
					<el-table-column
            prop="create_time"
            label="角色名称"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
						align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small">分配</el-button>
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
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
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
			handleSearchProductName() {
				this.historyData = this.initialProduct;
        this.historyData = this.search(this.historyData, {name: this.searchProductName});
      },
      handleView(row) {
        this.$router.push({ path:'/serviceConfiguration/list/serviceInfo?id='+row.id  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
