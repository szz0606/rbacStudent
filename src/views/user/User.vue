<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增用户</el-button>
    </div>

    <el-table :data="users" style="width: 100%; height: 380px" border>
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column
        prop="role_id"
        label="所属角色"
        :formatter="formatRole"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 添加用户对话框 -->
    <el-dialog v-model="userFormVisible" title="添加用户" width="500px">
      <el-form
        :model="user"
        ref="userFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="user.role_id" placeholder="请点击选择">
            <el-option
              v-for="option in roleOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              user._id == null ? addData(userFormRef) : updateData(userFormRef)
            "
          >
            确定
          </el-button>
          <el-button @click="userFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules, MessageBox } from 'element-plus';
import { formateDate } from '@/utils/dateUtils';
// 角色的仓库
import type { roleInfoData } from '@/api/role/type';
import { ref, reactive, onMounted, nextTick } from 'vue';
// 用户的仓库
import useRoleStore from '@/store/modules/role';
let roleStore = useRoleStore();

import type { userInfoData } from '@/api/user/type';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
const users = ref<userInfoData[] | undefined>([]);

let roleOptions = ref<roleInfoData[] | undefined>([]);
const handleEdit = (_id: string) => {
  // console.log('编辑', _id);
  handlerAdd();
  userStore.getUserById(_id).then((response) => {
    user.value = response;
  });
};
const updateData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      userStore.updateUser(user.value as userInfoData).then((response) => {
        userFormVisible.value = false;
        getUserList();
      });
    }
  });
};
const handleDelete = (_id: string) => {
  // console.log('删除', _id);
  ElMessageBox.confirm('确定要删除此条数据么？', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancle',
    type: 'warning',
  }).then(() => {
    userStore.deleteUser(_id).then((response) => {
      getUserList();
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    });
  });
};

const resetDate = (row: any, colum: any, cellValue: string, index: number) => {
  return formateDate(cellValue);
};
const formatRole = (row: any, colum: any, cellValue: string, index: number) => {
  let role = roleOptions?.value?.find((item) => item._id == cellValue) || {};
  return role.name;
};

const getRoleList = () => {
  if (roleStore.roles?.length) {
    roleOptions.value = roleStore.roles;
  } else {
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles;
    });
  }
};

const getUserList = () => {
  userStore
    .getUserList({ page: currentPage.value, size: pageSize.value })
    .then((response) => {
      users.value = userStore.users;
      total.value = response?.total as number;
    });
};

// 分页
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const totalPage = ref(1);
const handleSizeChange = (val: number) => {
  // console.log(`${val} items per change`);
  pageSize.value = val;
  getUserList();
};
const handleCurrentChange = (val: number) => [
  // console.log(` current page ${val}`),
  (currentPage.value = val),
  getUserList(),
];
// 分页

// 添加用户
const validateUserName = (rule: any, value: any, callback: any) => {
  // 长度
  const length = value && value.length;
  // 密码验证规则
  const pwdReg = /^[a-zAZ0-9_]+$/;
  // 提示信息
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else if (length < 4 || length > 88) {
    callback(new Error('长度在4至12位之间'));
  } else if (!pwdReg.test(value)) {
    callback(new Error('账户应该是 英文 数字 下划线'));
  } else {
    callback();
  }
};

// 手机号验证
const validatePhone = (rule: any, value: any, callback: any) => {
  value = value.trim();
  const phoneRge = /^1[23456789]\d{9}$/;
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (!phoneRge.test(value)) {
    callback(new Error('密码错误，请重新输入'));
  } else {
    callback();
  }
};

const user = ref<userInfoData | undefined>({
  _id: null,
  username: '',
  password: '',
  name: '',
  phone: '',
  role_id: '',
});
const userFormVisible = ref(false);
const userFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    { required: true, validator: validateUserName, trigger: ['blur'] },
  ],
  password: [
    { required: true, validator: validateUserName, trigger: ['blur'] },
    { min: 3, message: '长度大于4', trigger: 'blur' },
  ],
  name: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
  role_id: [{ required: true, message: '请选择角色', trigger: ['blur'] }],
  phone: [{ required: true, validator: validatePhone, trigger: ['blur'] }],
});
const handlerAdd = () => {
  user.value = {
    _id: null,
    username: '',
    passwoed: '',
    name: '',
    phone: '',
    role_id: '',
  };
  userFormVisible.value = true;
  nextTick(() => {
    userFormRef.value.resetFields();
  });
};
// 添加
const addData = (formEL: FormInstance | undefined) => {
  if (!formEL) return;
  formEL.validate(async (valid) => {
    if (valid) {
      userStore.addUser(user.value as userInfoData).then((response) => {
        userFormVisible.value = false;
        getUserList();
      });
    } else {
      return false;
    }
  });
};

onMounted(() => {
  getRoleList();
  getUserList();
});
</script>

<style scoped></style>
