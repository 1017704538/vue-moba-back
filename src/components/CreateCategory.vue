<template>
  <div>
    <h1>新建分类</h1>
    <el-form @submit.native.prevent="save">
      <!-- 上级分类选择 -->
      <el-form-item label="上级分类" label-width="120px">
        <el-select v-model="model.parent" placeholder="请选择" clearable>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 分类名称 -->
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label-width="120px">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      parents: ' '
    };
  },
  created() {
    this.getParents()
  },
  methods: {
    // 发起请求提交表单的数据
    async save() {
      const res = await this.$http.post("rest/categories", this.model);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async getParents() {
      const res = await this.$http.get("rest/categories");
      this.parents = res.data;
    }
  }
};
</script>

<style>

</style>