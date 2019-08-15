<!--顶部导航-->
<template>
  <div>
    <!-- 这里显示 index 小于 maxItem 的内容 -->
    <div v-for="(item,index) in currentPathArr" :href="item.path" :key="item.name"
         v-if="!item.hidden && index < maxItem">
      <!--这里设置一个长度大于了多少就下拉显示一级菜单-->
      <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length>0">
        <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
        {{item.title}}
      </MenuItem>

      <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length<=0">
        <router-link tag='span' :to="item.path + '/' + item.children[0].path"
                     style="display: inline-block;height:100%;width:100%">
          <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
          {{item.title}}
        </router-link>
      </MenuItem>
    </div>
    <Submenu name="group" v-if="maxItem !== currentPathArr.length && maxItem <= currentPathArr.length">
      <template slot="title">
        <Icon type="stats-bars"/>
        <!--其他内容-->
      </template>
      <MenuGroup title="列表">
        <div v-for="(item,index) in currentPathArr" :href="item.path" :key="item.name"
             v-if="!item.hidden && index >= maxItem">
          <!--无二级菜单-->
          <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length>0">
            <Icon :type="item.icon" :size="iconSize" :key="item.path" style="width: 20px"/>
            <span class="dropdownItemIcon">{{item.title}}</span>
          </MenuItem>
          <!--有二级菜单-->
          <MenuItem :name="item.path.split('/')[1]" v-if="item.children.length<=0">
            <router-link tag='span' :to="item.path + '/' + item.children[0].path"
                         style="display: inline-block;height:100%;width:100%">
              <Icon :type="item.icon" :size="iconSize" :key="item.path" style="width: 20px"/>
              <span class="dropdownItemIcon">{{item.title}}</span>
            </router-link>
          </MenuItem>
        </div>
      </MenuGroup>
    </Submenu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        iconSize: 14,
        //超过几个列表后显示下拉菜单 (前面有两个隐藏列，所以需要加上2)
        maxItem: 7
      }
    },
    computed: {
      currentPathArr() {
        return this.$store.state.app.routers;
        console.log(this.$store.state.app.routers)
      },
    }
  }
</script>
