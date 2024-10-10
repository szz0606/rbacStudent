import router from './router/index';
import pinia from './store';
import useUserStore from './store/modules/user';
let useStore = useUserStore(pinia);
// 路由拦截    beforEach
router.beforeEach((to, from, next) => {
  const user = useStore.user;
  //   如果他有值的话
  if (user && user._id) {
    // 并且如果他的
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});
