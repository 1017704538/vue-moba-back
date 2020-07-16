<template>
  <div>
    <el-container style="height: 100vh">
      <el-header>后台管理</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu class="el-menu-vertical-demo" router >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categories/create">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">物品</template>
                <el-menu-item index="/items/list">物品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
}

.el-aside {
  background-color: rgb(238, 241, 246);
}

.el-menu {
  border-right: 0;
}

.el-main {
  background-color: #eaedf1;
}
</style>