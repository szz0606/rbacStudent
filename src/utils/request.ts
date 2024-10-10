import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { Loading } from '@element-plus/icons-vue';

const loading = {
  LoadingInstance: null,
  open() {
    if (this.LoadingInstance == null) {
      this.LoadingInstance = ElLoading.service({
        text: '拼命加载中',
        background: 'rgba(0,0,0,0.5)',
        target: '.main',
      });
    }
  },
  close() {
    if (this.LoadingInstance != null) {
      this.LoadingInstance.close();
    }
    this.LoadingInstance = null;
  },
};

let request = axios.create({
  // 请求地址换成真是的地址
  // 所有以 VITE_ 开头的环境变量都可以通过 import.meta.env 访问。
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

const getMenus = () => {
  let userStore = useUserStore();
  const roleId = userStore.user?.role_id;
  const userMenus = userStore.user?.role?.menu;
  if (userStore.user?.username === 'admin') {
    return;
  }
  request({
    url: '/menus',
    method: 'post',
    data: {
      roleId,
    },
  }).then((response) => {
    const resp = response;
    if (resp.status === 0) {
      const menus = resp.data.menus;
      if (userMenus?.length === menus.length) {
        userMenus?.forEach((item) => {
          if (menus.indexOf(item) === -1) {
            userStore.removeUser();
            ElMessage({
              message: '当前用户权限被修改',
              type: 'warning',
            });
            window.location.href = '/login';
          }
        });
      } else {
        userStore.removeUser();
        ElMessage({
          message: '当前用户权限被修改',
          type: 'warning',
        });
        window.location.href = '/login';
      }
    }
  });
};

request.interceptors.request.use(
  (config) => {
    if (config.url != 'menus' && config.url != '/login') {
      loading.open();
      getMenus();
    }
    return config;
  },
  (error) => {
    loading.close();
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    loading.close();
    return response.data;
  },
  (error) => {
    loading.close();
    let msg = '';
    let status = error.response.status;
    switch (status) {
      case 401:
        msg = 'token过期';
        break;
      case 403:
        msg = '无访问权限';
        break;
      case 404:
        msg = '请求地址错误';
        break;
      case 500:
        msg = '服务器出现问题';
        break;
      default:
        msg = '无网络';
    }
    ElMessage({
      type: 'error',
      message: msg,
    });
    return Promise.reject(error);
  }
);
export default request;
