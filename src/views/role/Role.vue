<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handleAdd">创建角色</el-button>
      <el-button
        @click="roleAuthVisible = true"
        type="primary"
        :disabled="currentRow == null ? true : false"
        >设置角色权限</el-button
      >
    </div>
    <el-table
      class="role_table"
      ref="singleTable"
      :data="roleList"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      border
      height="380"
    >
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <el-table-column property="name" label="角色名称"></el-table-column>
      <el-table-column
        property="create_time"
        label="创建时间"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column
        property="auth_time"
        label="授权时间"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column property="auth_name" label="授权人"></el-table-column>
    </el-table>
    <!-- 添加角色对话框 -->
    <el-dialog v-model="roleFormVisible" title="添加角色" width="500px">
      <el-form
        :rules="rules"
        :model="role"
        ref="roleFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="role.name" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addData(roleFormRef)">
            确定
          </el-button>
          <el-button @click="roleFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 设置角色权限弹窗 -->

    <el-dialog v-model="roleAuthVisible" title="这是角色权限" width="500px">
      <!-- 这个属性绑定的是当前选中的行 -->
      <auth :role="currentRow" v-if="roleAuthVisible" ref="authRef"> </auth>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateData">确定</el-button>
          <el-button @click="roleAuthVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from 'vue';
import { formateDate } from '../../utils/dateUtils';
import { FormInstance, FormRules } from 'element-plus';
// 导入子组件
import Auth from './components/Auth.vue';
// 用户的仓库
import useUserStore from '@/store/modules/user';
const resetDate = (row: any, colum: any, cellValue: any, index: any) => {
  return formateDate(cellValue);
};
import type { roleInfoData } from '../../api/role/type';
import useRoleStore from '../../store/modules/role';
// 角色的小仓库
let useStore = useRoleStore();

let userStore = useUserStore();
// 选中行
let currentRow = ref(null);
// 获取数据列表
let roleList = ref<roleInfoData[] | undefined>([]);
let role = reactive({
  name: '',
});

// 制定规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
});
// 添加窗口的显隐
const roleFormVisible = ref(false);
// 角色的弹窗
const roleAuthVisible = ref(false);
const roleFormRef = ref<FormInstance>();
// 选中行
const handleCurrentChange = (val: any) => {
  currentRow.value = val;
  console.log(val);
};
// 添加角色
const handleAdd = () => {
  console.log(roleFormVisible);
  roleFormVisible.value = true;
  nextTick(() => {
    // 重置表单字段 清空输入的内容
    roleFormRef.value.resetFields();
  });
};
// 像数据列表里面添加输入的内容
const addData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 表单的验证方法
  formEl.validate(async (valid) => {
    if (valid) {
      // 如果验证通过，通过 useAddRole 添加内容
      useStore.useAddRole(role).then((response) => {
        roleFormVisible.value = false;
        getRoleList();
      });
    } else {
      return false;
    }
  });
};
// 把它变成响应式数据
const authRef = ref();
// 调用子组件中获取的放方法一系列
const updateData = () => {
  const newRole = authRef.value.getMenus();
  currentRow.value.menus = newRole.menus;
  currentRow.value.name = newRole.name;
  currentRow.value.auth_name = userStore.user?.username;
  useStore.useUpdateRole(currentRow.value).then((response) => {
    roleAuthVisible.value = false;
    getRoleList();
  });
};

const getRoleList = () => {
  useStore.roleList().then(() => {
    roleList.value = useStore.roles;
  });
};
onMounted(() => {
  getRoleList();
});
</script>

<style></style>
