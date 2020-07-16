<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="_id" label="id" width="220"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showEditDialog(scope.row._id)">编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="removeCategory(scope.row._id, scope.row.name)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑分类的对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        status-icon
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="editForm.parent" placeholder="请选择" clearable>
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parents: [],
      // 分类列表数据
      categoryList: [],
      editDialogVisible: false,
      editForm: {},
      // 编辑名称 表单的验证规则对象
      editFormRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCategoryList();
    this.getParents();
  },
  methods: {
    async getParents() {
      const res = await this.$http.get("rest/categories");
      this.parents = res.data;
    },
    //获取分类列表数据
    async getCategoryList() {
      const res = await this.$http.get("rest/categories");
      this.categoryList = res.data;
    },
    //展示编辑分类的对话框
    async showEditDialog(id) {
      // console.log(id)
      // 通过id查询分类名称
      this.getParents();
      const res = await this.$http.get("rest/categories/" + id);
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 监听编辑分类对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //保存分类名称
    async saveCategory() {
      const res = await this.$http.put(
        `rest/categories/${this.editForm._id}`,
        this.editForm
      );
      this.$message.success("保存成功");
      // 关闭对话框
      this.editDialogVisible = false;
      //刷新分类列表
      this.getCategoryList();
    },
    //删除分类
    async removeCategory(id, name) {
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm(
        `此操作将永久删除 ${name}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除");
      }

      const res = await this.$http.delete(`categories/${id}`);

      this.$message.success("删除成功");
      //刷新分类列表
      this.getCategoryList();
    }
  }
};
</script>

<style lang="">
</style>