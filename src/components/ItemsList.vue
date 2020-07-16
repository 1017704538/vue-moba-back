<template>
  <div>
    <h3>物品列表</h3>
    <el-button type="primary" @click="showCreateItemDialog">新建物品</el-button>
    <el-table :data="itemList" style="width: 100%">
      <el-table-column prop="_id" label="id" width="220"></el-table-column>
      <el-table-column prop="name" label="物品名称" width="180"></el-table-column>
      <el-table-column prop="icon" label="图标" width="180">
          <template slot-scope="scope">
              <img :src="scope.row.icon" style="height: 3em">
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showEditDialog(scope.row._id)">编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="removeItem(scope.row._id, scope.row.name)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建物品对话框 -->
    <el-dialog
      title="新建物品"
      :visible.sync="createItemDialogVisible"
      width="50%"
      @close="addDialogClosed"
      
    >
      <el-form ref="addFormRef" :model="addItem" label-width="70px">
        <!-- 分物品名称 -->
        <el-form-item label="名称">
          <el-input v-model="addItem.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
            <!-- 图片上传 -->
            <!--action  上传的接口地址 -->
          <el-upload
            class="avatar-uploader"            
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="addUpload"
          >
            <img v-if="addItem.icon" :src="addItem.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createItemDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createItem">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑物品的对话框 -->
    <el-dialog title="编辑物品" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" status-icon ref="editFormRef" label-width="70px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
            <!-- 图片上传 -->
            <!--action  上传的接口地址 -->
          <el-upload
            class="avatar-uploader"            
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="editForm.icon" :src="editForm.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createItemDialogVisible: false,
      addItem: {},
      itemList: [],
      editDialogVisible: false,
      editForm: {}
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    //监听添加物品对话框的关闭事件
    addDialogClosed() {
    //   this.$refs.addFormRef.resetFields();
    this.addItem = {}
    },
    //展示新建物品的对话框
    showCreateItemDialog() {
      this.createItemDialogVisible = true;
    },
    //展示编辑物品的对话框
    async showEditDialog(id) {
      const res = await this.$http.get("rest/items/" + id);
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    //新建物品
    async createItem() {
      const res = await this.$http.post("rest/items", this.addItem);
      this.$message({
        type: "success",
        message: "保存成功"
      });
      //   关闭对话框
      this.createItemDialogVisible = false;
      //   刷新页面
      this.getItemList();
    },
    //获取物品列表
    async getItemList() {
      const res = await this.$http.get("rest/items");
      this.itemList = res.data;
    },
    //保存物品名称
    async saveItem() {
      const res = await this.$http.put(
        `rest/items/${this.editForm._id}`,
        this.editForm
      );
      this.$message.success("保存成功");
      // 关闭对话框
      this.editDialogVisible = false;
      //刷新分类列表
      this.getItemList();
    },
    async removeItem(id, name) {
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

      const res = await this.$http.delete(`rest/items/${id}`);

      this.$message.success("删除成功");
      //刷新分类列表
      this.getItemList();
    },
    afterUpload(res) {
        // console.log(res)
        this.$set(this.editForm, 'icon', res.url)
        // this.editForm.icon = res.url
    },
    addUpload(res) {
        this.$set(this.addItem, 'icon', res.url)
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}

.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>