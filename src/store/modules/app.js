import Cookies from 'js-cookie'
import {otherRouterMap, constantRouterMap} from '../../router';

const app = {
  state: {
    sidebar: !+Cookies.get('sidebarStat'),
    routers: constantRouterMap,
    menuTheme: 'dark',
    currentPathArr: [],
    pageOpenedList: [{
      name: "home_index",
      path: "/home",
      title: "首页"
    }],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = constantRouterMap.concat(routers);
    },
    SET_SIDEBAR: state => {
      Cookies.set('sidebarStat', state.sidebar ? 1 : 0);
      state.sidebar = !state.sidebar
    },
    SET_currentPathArr: (state, currentPathArr) => {
      state.currentPathArr = currentPathArr
    },
    addPageOpened: (state, tag) => {
      let flag = true;
      state.pageOpenedList.map((item, index) => {
        if (item.name === tag.name) {
          flag = false;
        }
      });
      if (flag) {
        state.pageOpenedList.push(tag);
      }
      // 设置大于五个就删除一个
      // if (state.pageOpenedList.length > 5) {
      //   state.pageOpenedList.splice(1, 1);
      // }
    },
    closeOnePageOpend: (state, name) => {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },
    clearAllPageTags: (state) => {
      state.pageOpenedList = [{
        name: "home_index",
        path: "/home",
        title: "首页"
      }];
    },
    clearOtherPageTags: (state, name) => {
      let newPageList = [];
      state.pageOpenedList.map((item, index) => {
        if (item.name === name || item.name === "home_index") {
          newPageList.push(item)
        }
      });
      state.pageOpenedList = newPageList;
    },
    ChangeMenuTheme: (state, name) => {
      if (state.menuTheme === 'dark') {
        state.menuTheme = 'light';
      } else {
        state.menuTheme = 'dark';
      }
    }
  },
  actions: {
    ChangeSidebar: ({commit}) => {
      commit('SET_SIDEBAR')
    },
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', otherRouterMap);
        resolve();
      })
    },
    ChangeCurrentPathArr({commit}, data) {
      commit('SET_currentPathArr', data);
    }
  }
}

export default app
