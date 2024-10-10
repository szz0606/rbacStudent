<template>
  <div>
    <app-header></app-header>
    <app-nav-bar></app-nav-bar>
    <app-main></app-main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue';
import AppMain from '@/components/AppMain/index.vue';
import AppNavBar from '@/components/AppNavBar/index.vue';
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  padding: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background: #2d3d4a;
}
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background: #5a5664;
}

.main {
  position: absolute;
  top: 50px; /* 与头部对齐 */
  left: 230px; /* 与导航栏对齐 */
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
  background: #7a8a7a;
}
</style>
