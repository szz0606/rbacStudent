<template>
  <div>
    <template v-for="(item, index) in menuList" :key="item.index">
      <el-menu-item :index="item.index" v-if="!item.children">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>

      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <!-- 使用递归组件，生成2级菜单项 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Menu',
  props: ['menuList'],
};
</script>

<style></style>
