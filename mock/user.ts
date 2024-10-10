function createUserList() {
  return {
    status: 0,
    data: [
      {
        token: 'Admin Token',
        _id: '641280fdc5ff3cb994002003',
        username: 'test1',
        name: '测试用户',
        password: '123456',
        phone: '131112345678',
        role_id: '640ec59a9f6e3402f8edd4ec',
        create_time: 1678934269969,
        __v: 0,
        role: {
          _id: '640ec59a9f6e3402f8edd4ec',
          name: '管理员',
          menus: [
            '/home',
            '/user',
            '/role',
            '/school',
            '/majors',
            '/student',
            '/class',
          ],
          create_time: 1678689690752,
          __v: 0,
          auth_time: 1678952409061,
          auth_name: 'test1',
        },
      },
      {
        token: 'System Token',
        _id: '64098cc6984047a6c854b303',
        username: 'admin',
        password: 'admin',
        create_time: 1678347462193,
        __v: 0,
        role: {
          menus: [],
        },
      },
    ],
  };
}

export default [
  {
    // 路由 /mock/login
    // 处理用户登录请求
    url: '/mock/login',
    method: 'post',
    // 使用response获取返回模拟接口的返回结果
    response: ({ body }) => {
      // 从返回里面获取username和password
      const { username, password } = body;
      // find查找在数组中符合条件的元素 它的作用是遍历数组 只返回第一个符合条件的元素
      // 定义一个变量 用来获取上面这个函数中的data的name和password 因为它会返回第一个符合的元素
      const checkUser = createUserList().data.find(
        // 回调 符合条件的返回 用户名和密码匹配
        (item) => item.username === username && item.password === password
      );
      // 如果没有返回的用户名和密码 返回错误
      if (!checkUser) {
        return {
          status: 1,
          msg: '错误',
        };
      }
      // 如果有返回的内容 则返回出来
      const { token } = checkUser;
      return {
        status: 0,
        data: { token },
      };
    },
  },
  {
    url: '/mock/user/info',
    method: 'get',
    response: (request) => {
      const token = request.headers.token;
      // console.log(request.headers.token);
      const chenkUser = createUserList().data.find(
        (item) => item.token === token
      );
      if (!chenkUser) {
        return { status: 1, data: { message: '获取失败' } };
      }
      return { status: 0, data: { ...chenkUser } };
    },
  },
];
