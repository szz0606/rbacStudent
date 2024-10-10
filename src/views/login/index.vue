<template>
  <div class="login-container">
    <!-- ref 相当于 id，:model 表单数据对象, label-width 表单域标签的的宽度 -->
    <!-- ref 让我们可以获取组件的实例，通过这个实例你可以调用组件的方法，例如表单验证的 validate 方法。 -->
    <el-form
      ref="ruleFormRef"
      :model="form"
      label-width="80px"
      class="login-form"
      :rules="rules"
    >
      <!-- 验证规则根据下面两个input来验证 -->
      <h2 class="login-title">登录</h2>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <!-- prop是element-plus验证表单的基础
      Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。
      prop="username" 表示该 el-form-item 中的 el-input 输入框的验证规则会绑定到 username 这个字段。
      当表单提交时，el-form 组件会根据 prop 去找与 username 字段对应的验证规则，如果输入框内容不符合规则就会显示错误信息。 -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 把整个表单实例传给这个方法 用来验证 -->
        <el-button type="primary" @click="onSubmit(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// 验证规则FormRules 是用于描述表单验证规则的类型。它用于定义 el-form 中 rules 属性的类型，
// 确保表单的验证规则结构正确。每个字段的验证规则可以包含多个验证条件，比如 required、min、max、message 等。
import { createApp, reactive, ref } from 'vue';
// FormInstance form组件的类型定义
import { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
let $router = useRouter();
import useUserStore from '../../store/modules/user';
let useStore = useUserStore();
import { ElMessage } from 'element-plus';

const form = reactive({
  username: '',
  password: '',
});
// 告诉ts  ref 引用的类型是FormInstance
//通过 ref 创建 FormInstance 的引用 数据是响应式的 需要对比
const ruleFormRef = ref<FormInstance>();
// 自定义一下校验规则
/** 在 Element Plus 中，自定义验证规则函数通常有三个参数：
rule：当前验证规则（通常可以忽略）。
value：需要验证的字段的值（例如用户输入的用户名）。
callback：用于通知验证的结果，触发验证提示。如果验证失败，调用 callback 并传递错误信息。如果验证成功，调用 callback 不传任何参数。 */
// 验证用户名 里面有验证的规则 值，回调函数(验证完了之后要干什么)
const validataUserName = (rule: any, value: any, callback: any) => {
  // value是我输入的用户名
  value = value.trim();
  // 首先他得有值
  const length = value && value.length;
  const pwdReg = /^[a-zA-z0-9]+$/;
  if (value === '') {
    callback(new Error('请输入账号'));
  } else if (length < 4 || length > 12) {
    callback(new Error('长度在4-12之间'));
    // test 测试字符串是否符合验证规则 符合true 不符合false
    // test 方法会测试一个字符串是否匹配正则表达式，
  } else if (!pwdReg.test(value)) {
    callback(new Error('账号是英文,数字,下划线'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      // 函数验证规则是validataUserName 用于对username进行额外的逻辑验证(如检查格式)
      validator: validataUserName,
      // 当失去焦点或改变时触发
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change'],
    },
  ],
});
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // validate 用于触发表单的验证。它会根据表单项的 prop 属性和绑定的验证规则进行校验，
  // 验证通过时返回 true，否则返回 false 并显示错误信息。
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        await useStore.userLogin(form);
        $router.push('/');
        ElMessage({
          type: 'success',
          message: '登陆成功',
        });
      } catch (error) {
        $router.push('/404');
        ElMessage({
          type: 'error',
          message: (error as Error).message,
        });
      }
    } else {
      console.log('errSubmit');
      return false;
    }
  });
};
</script>
<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background: rgb(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../../assets/bg.jpg');
  overflow: hidden;
}
.login-title {
  text-align: center;
  color: #333;
}
</style>
