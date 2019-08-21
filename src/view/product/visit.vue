<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>
<template>
  <div id="app">
		<Card>
			<p slot="title">
        <Icon type="help-buoy"></Icon>
        商品访问管理
      </p>
      <Row>
        <div class="demo-input-suffix">
          商品名称：
				  <Input v-model="searchProductName" icon="search" placeholder="请输入商品名称" style="width: 180px" />
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
          <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">新增</el-button>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <el-table
          :data="historyData"
          border
          style="width: 100%">
          <el-table-column
            fixed="left"
            align="center"
            label="序号"
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="name"
            sortable
            align="center"
            label="商品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="money"
            sortable
            align="center"
            label="预付款"
            width="150">
          </el-table-column>
          <el-table-column
            prop="count"
            sortable
            align="center"
            label="访问次数"
            width="240">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            align="center"
            width="120">
            <template slot-scope="scope">
              {{scope.row.status == 0 ? '开启' : scope.row.status == 1 ? '关闭' : scope.row.status == 2 ? '失效' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            sortable
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            sortable
            align="center"
            width="320">
            <template slot-scope="scope">
              <el-button @click="handleView" type="text" size="small">查看</el-button>
              <el-button @click="handleView" type="text" size="small">编辑</el-button>
              <el-button @click="dialogVisibleSale = true" type="text" size="small">上架</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleSale"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要上架该商品吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleSale = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleSale = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleUp = true" type="text" size="small">置顶</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleUp"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品置顶吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleUp = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleUp = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleDown = true" type="text" size="small">置尾</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDown"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品置尾吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDown = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleDown = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleDelete = true" type="text" size="small">删除</el-button>
               <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDelete"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将删除该商品吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDelete = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleDelete = false">确 定</el-button>
                </span>
              </el-dialog>
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
				this.historyData = this.initialProduct =  table.productVisit;
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
        this.ajaxHistoryData = table.productVisit
        this.dataCount = table.productVisit.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.productVisit.length < this.pageSize){
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
      handleView() {
        this.$router.push({ path:'/product/list/productInfo'  })
      }
    },
    created(){
      this.handleListApproveHistory();
    }
  }
</script>
