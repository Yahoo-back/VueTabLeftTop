<template>
  <div class="main" :class="{'main-hide-text': sidebar}">
    <div class="sidebar-menu-con"
         :style="{width: sidebar?closeSidebarWidth:openSidebarWidth, overflow: sidebar ? 'visible' : 'auto', background: menuTheme === 'dark'?'#495060':'white'}">
      <Sidebar ref="sidebar"/>
    </div>
    <!--顶部布局-->
    <div class="main-header-con" :style="{paddingLeft: sidebar?closeSidebarWidth:openSidebarWidth}">
      <!--顶部展示-->
      <Navbar @select="selectMenu" :menuActive="menuActive"/>
    </div>
    <div class="single-page-con" :style="{left: sidebar?closeSidebarWidth:openSidebarWidth}">
      <div class="single-page">
        <!--根据菜单展示内容-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <Bottom/>
    </div>
  </div>
</template>
<script>
  import Sidebar from './Sidebar.vue'
  import Bottom from './Bottom.vue'
  import Navbar from './Navbar.vue'
  import {mapGetters} from 'vuex';
  import util from '@/utils/util.js';

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Bottom,
      Navbar
    },
    data() {
      return {
        hideMenuText: false,
        currentPath: "",
        // 当前选中菜单的名称(name属性)
        menuActive: "",
        //是否完成初始化
        init:false,
        //侧边栏关闭宽度
        closeSidebarWidth:'90px',
        //侧边栏打开宽度
        openSidebarWidth:'200px'
      };
    },
    computed: {
      ...mapGetters([
        'sidebar',
      ]),
      menuTheme() {
        return this.$store.state.app.menuTheme;
      }
    },
    methods: {
      changePathArr(name) {
        let pathArr = util.setCurrentPath(this, name);
        this.$store.dispatch('ChangeCurrentPathArr', pathArr);
        let tag = pathArr[pathArr.length - 1];
        this.$store.commit('addPageOpened', tag);
      },
      //导航栏选择菜单时回调
      selectMenu(name) {
        this.$refs.sidebar.changeNavMenu(name);
        this.menuActive = name;
      }
    },
    watch: {
      '$route'(to) {
        this.changePathArr(to.name)
      }
    },
    mounted() {
      this.changePathArr(this.$route.name);
      //初始化导航
      this.selectMenu(this.$route.path.split('/')[1])
    }
  }
</script>

<style lang="less">
  .maxlogo {
    padding-right: 1em;
  }

  .sidebarleft {
    padding-left: 90px;
  }
  .sidebarleftleng {
    padding-left: 200px;
  }

</style>
