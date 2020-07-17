<template>
  <div>
    <h3>英雄列表</h3>
    <el-button type="primary" @click="showAddDialog">新建英雄</el-button>
    <el-table :data="heroList" style="width: 100%">
      <el-table-column prop="_id" label="id" width="220"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="180"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="180">
          <template slot-scope="scope">
              <img :src="scope.row.avatar" style="height: 3em">
          </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showEditDialog(scope.row._id)">编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="removeHero(scope.row._id, scope.row.name)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建英雄对话框 -->
    <el-dialog
      title="新建英雄"
      :visible.sync="createDialogVisible"
      width="50%"
      @close="addDialogClosed"
      
    >
      <el-form ref="addFormRef" :model="addForm" label-width="70px">
        <!-- 英雄名称 -->
        <el-form-item label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="avatar">
            <!-- 图片上传 -->
            <!--action  上传的接口地址 -->
          <el-upload
            class="avatar-uploader"            
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="addUpload"
          >
            <img v-if="addForm.avatar" :src="addForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createItem">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑英雄的对话框 -->
    <el-dialog title="编辑英雄" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" status-icon ref="editFormRef" label-width="70px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="avatar">
            <!-- 图片上传 -->
            <!--action  上传的接口地址 -->
          <el-upload
            class="avatar-uploader"            
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
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
      createDialogVisible: false,
      addForm: {
          name: '',
          avatar: ''
      },
      heroList: [],
      editDialogVisible: false,
      editForm: {
          name: '',
          avatar: ''          
      }
    };
  },
  created() {
    this.getHeroList();
  },
  methods: {
    //监听添加英雄对话框的关闭事件
    addDialogClosed() {
    //   this.$refs.addFormRef.resetFields();
    this.addForm = {}
    },
    //展示新建英雄的对话框
    showAddDialog() {
      this.createDialogVisible = true;
    },
    //展示编辑英雄的对话框
    async showEditDialog(id) {
      const res = await this.$http.get("rest/heros/" + id);
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    //新建英雄
    async createItem() {
      const res = await this.$http.post("rest/heros", this.addForm);
      this.$message({
        type: "success",
        message: "保存成功"
      });
      //   关闭对话框
      this.createDialogVisible = false;
      //   刷新页面
      this.getHeroList();
    },
    //获取英雄列表
    async getHeroList() {
      const res = await this.$http.get("rest/heros");
      this.heroList = res.data;
    },
    //保存英雄名称
    async saveItem() {
      const res = await this.$http.put(
        `rest/heros/${this.editForm._id}`,
        this.editForm
      );
      this.$message.success("保存成功");
      // 关闭对话框
      this.editDialogVisible = false;
      //刷新分类列表
      this.getHeroList();
    },
    async removeHero(id, name) {
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

      const res = await this.$http.delete(`rest/heros/${id}`);

      this.$message.success("删除成功");
      //刷新分类列表
      this.getHeroList();
    },
    afterUpload(res) {
        // console.log(res)
        // this.$set(this.editForm, 'icon', res.url)
        this.editForm.avatar = res.url
    },
    addUpload(res) {
        // this.$set(this.addForm, 'icon', res.url)
        this.addForm.avatar = res.url
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