<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="_id" label="id" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 分类列表数据
            categoryList: []
        }
    },
    created() {
        this.getCategoryList()
    },
    methods: {
        //获取分类列表数据
        async getCategoryList() {
            const res = await this.$http.get('categories')
            this.categoryList = res.data
        }
    },
};
</script>

<style lang="">
</style>