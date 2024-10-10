// loadEnv(mode, process.cwd()vite提供的加载指定环境的的方法 mode是当前的环境模式 process返回进程的工作目录，根目录
import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode, process.cwd());
  // 大大
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    // 把mock替换成真实的后台接口了
    // 代理跨域
    server: {
      proxy: {
        // 从这个位置去拿
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_URL,
          // 是否处理跨域
          changeOring: true,
          // 将请求路径中的 /dev-api 前缀替换为空字符串
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  };
};
