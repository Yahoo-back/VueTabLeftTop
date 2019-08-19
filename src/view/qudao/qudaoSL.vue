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
        渠道缩量
      </p>
      <Row>
        <div class="demo-input-suffix">
          渠道名称：
					<Select v-model="status" style="width:100px">
            <Option v-for="item in city" :label="item.label" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
				  <!-- <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          缩量百分比：
				  <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" />
					缩量操作时间：
				  <Input v-model="searchProductName" @on-change="handleSearchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" />
					<el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">新增渠道缩量</el-button>
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
            label="缩量名称">
          </el-table-column>
					<el-table-column
            prop="create_time"
            label="缩量百分比"
            sortable
						align="center">
          </el-table-column>
          <el-table-column
            prop="classify"
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
              <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              <el-button  @click="handleView(scope.row)" type="text" size="small">修改</el-button>
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
        this.$router.push({ path:'/qudao/qudaoSL/qdSLInfo?id='+row.id  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
