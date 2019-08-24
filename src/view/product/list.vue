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
        商品列表
      </p>
      <Row>
        <div class="demo-input-suffix">
          商品名称：
          <!-- <el-input style="width: 180px" placeholder="请输入搜索内容"></el-input> -->
          <el-input placeholder="请输入商品名称" style="width: 180px" v-model="name" suffix-icon="el-icon-search" clearable />
				  <!-- <Input v-model="name" icon="search" placeholder="请输入商品名称" style="width: 180px" /> -->
          创建时间:
          <el-date-picker
            v-model="create_time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          分类：
          <el-select v-model="classify" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option v-for="item in rows" :label="item.name" :value="item.name" :key="item.name">{{ item.name }}</el-option>
          </el-select>
          <!-- <Select v-model="classify" style="width:100px">
            <Option v-for="item in rows" :label="item.name" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select> -->
          状态：
          <el-select v-model="status" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="下架" value="0">下架</el-option>
            <el-option label="上架" value="1">上架</el-option>
          </el-select>
          <!-- <Select v-model="status" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">下架</Option>
            <Option value="1">上架</Option>
          </Select> -->
          是否首页热门：
          <el-select v-model="is_hot" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="否" value="0">否</el-option>
            <el-option label="是" value="1">是</el-option>
          </el-select>
          <!-- <Select v-model="is_hot" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select> -->
          位置：
          <el-select v-model="position" placeholder="请选择" style="width:100px">
            <el-option  value="">请选择</el-option>
            <el-option label="默认" value="0">默认</el-option>
            <el-option label="置顶" value="1">置顶</el-option>
            <el-option label="置尾" value="2">置尾</el-option>
          </el-select>
          <!-- <Select v-model="position" style="width:100px">
            <Option value="">请选择</Option>
            <Option value="0">默认</Option>
            <Option value="1">置顶</Option>
            <Option value="2">置尾</Option>
          </Select> -->
          <el-button @click="handleSearch" type="primary" size="small" style="margin-left: 20px">查询</el-button>
          <el-button @click="handleView" type="primary" size="small" style="margin-left: 20px">新增商品</el-button>
        </div>
      </Row>
      <div style="margin-top: 20px">
        <!-- <Table :columns="productColumns" :data="shoppingData" style="width: 100%;"></Table> -->
          <!-- :data="historyData" -->
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
            prop="classify"
            sortable
            align="center"
            label="分类"
            width="150">
          </el-table-column>
          <el-table-column
            prop="link"
            sortable
            align="center"
            label="链接"
            width="240">
          </el-table-column>         
          <el-table-column
            label="状态"
            sortable
            align="center"
            width="120">
            <template slot-scope="scope">
              {{scope.row.status == 0 ? '下架' : scope.row.status == 1 ? '上架' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            label="是否首页热门"
            sortable
            align="center"
            width="150">
            <template slot-scope="scope">
              {{scope.row.is_hot == 0 ? '否' : scope.row.is_hot == 1 ? '是' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="hot_sort"
            label="热门排序"
            sortable
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            label="位置"
            width="120">
            <template slot-scope="scope">
              {{scope.row.position == 1 ? '置顶' : scope.row.position == 2 ? '置尾' : scope.row.position == 0 ? '默认' : '未知'}}
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
              <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleView" type="text" size="small">编辑</el-button>
              <el-button @click="dialogVisibleUp = true" type="text" size="small" v-if="scope.row.status == 0">上架</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleUp"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品上架吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleUp = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleUp = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleDown = true" type="text" size="small" v-if="scope.row.status == 1">下架</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleDown"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品下架吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDown = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleDown = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleTop = true" type="text" size="small" v-if="scope.row.position == 0">置顶</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleTop"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品置顶吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleTop = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleTop = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleCTop = true" type="text" size="small" v-if="scope.row.position == 1">取消置顶</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleCTop"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品取消置顶吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleCTop = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleCTop = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleBottom = true" type="text" size="small" v-if="scope.row.position == 0">置尾</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleBottom"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品置尾吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleBottom = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleBottom = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button @click="dialogVisibleCBottom = true" type="text" size="small" v-if="scope.row.position == 2">取消置尾</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisibleCBottom"
                :append-to-body='true'
                width="30%"
                :before-close="handleClose">
                <span>确定要将该商品取消置尾吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleCBottom = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisibleCBottom = false">确 定</el-button>
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
<script>
import * as table from './data/table';
  export default {
      data () {
        return {
          productColumns: [
            {
              type: 'index',
              title: '序号',
              width: 60
            },
            {
              title: '购物单号',
              key: 'shopping_id',
              align: 'center'
            },
            {
              title: '购买物品名称',
              key: 'name',
              align: 'center'
            },
            {
              title: '购买时间',
              key: 'time'
            },
            {
              title: '查看详情',
              key: 'show_more',
              align: 'center',
              render: (h, params) => {
                return h('Button', { 
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let query = {shopping_id: params.row.shopping_id};
                      this.$router.push({
                        name: 'shopping',
                        query: query
                      });
                    }
                  }
                }, '了解详情');
              }
            }
          ],
          dialogVisibleUp: false,
          dialogVisibleTop: false,
          dialogVisibleCTop: false,
          dialogVisibleDown: false,
          dialogVisibleBottom: false,
          dialogVisibleCBottom: false,
          dialogVisibleDelete: false,
          create_time: '',
          rows : [
            {
              name: '现金贷',
            },
            {
              name: '借条',
            }
          ],
          status: '',
          status1: '',
          classify: '',
          position: '',
          is_hot: '',
          name: '',
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
        console.log(this.historyData)
      },
      //查询
      search (data, argumentObj) {
        let res = data;
        let dataClone = data;
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1;
            });
            dataClone = res;
          }
        }
      return res;
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
        this.ajaxHistoryData = table.productList
        this.dataCount = table.productList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(table.productList.length < this.pageSize){
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
      //商品名称查询
			handleSearch() {
        this.historyData = this.initialProduct;
        console.log(this.historyData)
        this.historyData = this.search(this.historyData, {name: this.name, classify: this.classify, is_hot: this.is_hot, position: this.position});
      },
      handleView(row) {
        this.$router.push({ path:'/product/list/productInfo?id='+row.id  })
      }
    },
    computed: {
    },
    created(){
      this.handleListApproveHistory();
    },
  }
</script>
