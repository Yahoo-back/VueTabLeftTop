<style rel="stylesheet/less" lang="less">
  @import "./home.less";
  @import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col :md="24" :lg="24">
        <Row class-name="home-page-row1" :gutter="10">
          <!--用户-->
          <Col :md="12" :lg="12" :style="{marginBottom: '10px'}">
            <Card>
              <Row type="flex" class="user-infor">
                <Col span="8">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <img class="avator-img" :src="avatorPath" style="background: #2db7f5;margin-left: 10px;"/>
                  </Row>
                </Col>
                <Col span="16" style="padding-left:6px;">
                  <Row class-name="made-child-con-middle" type="flex" align="middle">
                    <div>
                      <b class="card-user-infor-name">admin</b>
                      <p>super admin</p>
                    </div>
                  </Row>
                </Col>
              </Row>
              <div class="line-gray"></div>
              <Row class="margin-top-8">
                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
              </Row>
              <Row class="margin-top-8">
                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                <Col span="16" class="padding-left-8">北京</Col>
              </Row>
            </Card>
          </Col>
          <!--待办事务-->
          <Col :md="12" :lg="12" :style="{marginBottom: '10px'}">
            <Card>
              <p slot="title" class="card-title">
                <Icon type="android-checkbox-outline"></Icon>
                待办事项
              </p>
              <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                <Icon type="plus-round"></Icon>
              </a>
              <Modal
                v-model="showAddNewTodo"
                title="添加新的待办事项"
                @on-ok="addNew"
                @on-cancel="cancelAdd">
                <Row type="flex" justify="center">
                  <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px"/>
                </Row>
                <Row slot="footer">
                  <Button type="text" @click="cancelAdd">取消</Button>
                  <Button type="primary" @click="addNew">确定</Button>
                </Row>
              </Modal>
              <div class="to-do-list-con">
                <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)"
                     class="to-do-item">
                  <to-do-list-item :content="item.title"></to-do-list-item>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row :gutter="10" class="margin-top-10">
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-map"></Icon>
            上周每日来访量统计
          </p>
          <div class="data-source-row">
            <visite-volume></visite-volume>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            数据来源统计
          </p>
          <div class="data-source-row">
            <data-source-pie></data-source-pie>
          </div>
        </Card>
      </Col>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-shuffle-strong"></Icon>
          上周每日服务调用量(万)
        </p>
        <div class="line-chart-con">
          <service-requests></service-requests>
        </div>
      </Card>
    </Row>
  </div>
</template>

<script>
  import avator from '@/assets/avator.png';
  import toDoListItem from './components/toDoListItem.vue';//待办事项
  import visiteVolume from './components/visiteVolume.vue';//上周每日来访量统计
  import dataSourcePie from './components/dataSourcePie.vue';// 数据来源统计
  import serviceRequests from './components/serviceRequests.vue';//上周每日服务调用量

  export default {
    name: 'home',
    components: {
      toDoListItem,
      visiteVolume,
      dataSourcePie,
      serviceRequests
    },
    data() {
      return {
        toDoList: [
          {
            title: '学习完整的iView组件学习完整的iView组件'
          },
          {
            title: '学习完整的iView组件'
          },
          {
            title: '学习完整的iView组件'
          }
        ],
        showAddNewTodo: false,
        newToDoItemValue: '',
        avatorPath: avator,
      };
    },

    computed: {
      name() {
        return this.$route.path


      },
      // avatorPath() {
      //   console.log(localStorage.avatorImgPath);
      //   return localStorage.avatorImgPath;
      // }
    },
    methods: {
      addNewToDoItem() {
        this.showAddNewTodo = true;
      },
      addNew() {
        if (this.newToDoItemValue.length !== 0) {
          this.toDoList.unshift({
            title: this.newToDoItemValue
          });
          setTimeout(() => {
            this.newToDoItemValue = '';
          }, 200);
          this.showAddNewTodo = false;
        } else {
          this.$Message.error('请输入待办事项内容');
        }
      },
      cancelAdd() {
        this.showAddNewTodo = false;
        this.newToDoItemValue = '';
      }
    }
  }
</script>


