<template>
  <div>
    <div class="main-header">
      <!--设置菜单默认选中条目-->
      <Menu mode="horizontal" :active-name="$route.path.split('/')[1]" @on-select="selectMenu">
        <div class="navicon-con">
          <!--菜单的缩进和展开功能-->
          <Button :style="{transform: 'rotateZ(' + (this.sidebar ? '90' : '0') + 'deg)'}" type="text"
                  @click="toggleSideBar">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <breadcrumbNav/>
        <div class="layout-nav">
          <div class="main-header-operate">
            <div class="header-avator-con-icon">
              <div>
                <screenfull style="margin-top: 4px"/>
              </div>
              <div>
                <themeDropMenu @on-select="selectMenu"/>
              </div>
            </div>
            <div class="header-avator-con">
              <div class="user-dropdown-menu-con">
                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                  <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                    <a href="javascript:void(0)">
                      <span class="main-user-name">{{userName}}</span>
                      <!--下拉按钮，以后会用到-->
                      <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Avatar :src="avator" style="background: #2db7f5;margin-left: 10px;"></Avatar>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </div>
    <div class="tags-con">
      <tagsOpened  @on-select="selectMenu" :pageTagsList="pageTagsList"></tagsOpened>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import breadcrumbNav from './BreadcrumbNav.vue';
  import tagsOpened from './TagsOpened.vue';
  import screenfull from '@/components/main/Screenfull.vue';
  import themeDropMenu from '@/components/main/ThemeDropMenu.vue';
  import avator from '@/assets/avator.png';

  export default {
    name: 'navbar',
    components: {
      breadcrumbNav,
      tagsOpened,
      screenfull,
      themeDropMenu,
    },
    data() {
      return {
        avator: avator,
      };
    },
    props: ['menuActive'],
    computed: {
      pageTagsList() {
        return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
      },
      ...mapGetters([
        'sidebar',
        'userInfo',
      ]),
      userName() {
        if (this.userInfo === null && this.userInfo !== "") {
          return ""
        } else {
          return this.userInfo.userName
        }
      },
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ChangeSidebar')
      },
      handleClickUserDropdown(e) {
        if (e === "loginout") {
          this.$store.dispatch('LogOut').then(() => {
            location.reload();
          });
        }
      },
      //选中导航菜单回调
      selectMenu(name) {
        this.$emit("select", name);

      }
    }
  }
</script>
