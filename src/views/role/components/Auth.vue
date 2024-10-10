<template>
  <div>
    <el-form
      :model="updateRole"
      ref="roleForm"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="updateRole.name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 树形控件 -->
    <el-tree
      :data="authList"
      show-checkbox
      node-key="index"
      :default-expand-all="true"
      :default-checked-keys="checkedKeys"
      @check-change="handleCheckChange"
    ></el-tree>
  </div>
</template>

<script setup lang="ts">
// 表单规则验证
import type { FormInstance, FormRules } from 'element-plus';
// 没用上
import type Node from 'element-plus/es/components/tree/src/model/node';
// 菜单的数据列表
import menuList from '@/config/menuConfig';
// 类型校验
import type { roleInfoData } from '@/api/role/type';
// vue中的响应式数据
import { ref, reactive, onMounted } from 'vue';
// 数据类型校验  不是公共的所以直接在这里定义
interface Tree {
  index: string;
}
// 接受父组件传过来的对象 要更新这个对象 接受的是档期那选中的行的行
const props = defineProps(['role']);
// 更新之后的角色数据
let updateRole: roleInfoData = reactive({
  name: '',
});
// 获取属性结构的数据列表
const authList = ref([]);
let checkedKeys = reactive<any>([]);
// 类型 一一对应
const roleForm = ref<FormInstance>;
// 数据校验
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
});
// 给父组件提供数据
const getMenus = () => {
  updateRole.menus = checkedKeys;
  return updateRole;
};

// 通过这个函数把他暴露出去 defineExpose用来明确地将组件的某些方法或数据暴露给父组件。
defineExpose({
  getMenus,
});

// 树形结构里面的操作  管理树形结构中选中项的状态
const handleCheckChange = (
  data: Tree, //当前节点的数据 它的数据类型是Tree
  checked: boolean, // 当前节点是否被选中
  indeterminate: boolean // 当前节点是否处于部分选中状态
) => {
  if (checked) {
    // 如果被选中了的话 节点不是/students 并且checkedKeys里面没有他的话
    if (data.index != '/students' && checkedKeys.indexOf(data.index) === -1) {
      // 把他的索引添加到checkedKeys立面
      checkedKeys.push(data.index); //checkedKeys里面村属的是所有选中项的索引
    }
  } else {
    // 如果当前节点未选中 但checkedKeys里面有这个值得话
    if (checkedKeys.indexOf(data.index) != -1) {
      // 把这个值从checkedKeys里面移除出去
      checkedKeys.splice(checkedKeys.indexOf(data.index), 1);
    }
  }
};

const getAuthNodes = (menuList: any) => {
  return menuList.map((item: any) => {
    // 只有一级目录的话
    if (!item.children) {
      return {
        index: item.index,
        label: item.title,
      };
    } else {
      return {
        index: item.index,
        label: item.title,
        // 如果有二级列表的话 用二级列表再次调用这个函数  形成了一个递归
        children: getAuthNodes(item.children),
      };
    }
  });
};
onMounted(() => {
  authList.value = getAuthNodes(menuList);
  updateRole = reactive({ ...props.role });
  checkedKeys = [...props.role.menus];
});
</script>

<style></style>
