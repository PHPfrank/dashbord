export default [
    // user
    {
      path: '/home',
      routes: [
        { path: '/home/', redirect: './login' },
        { path: '/home/login', component: 'login/index.js' },
      ],
    },
    // app
    {
// 访问 / 下面的路由的时，使用 page 文件夹下的 ../layout 布局文件渲染页面，默认展示hello组件

// 访问 /dashboard/user 时，使用 page 文件夹下的dashboard/user 组件渲染到 layout 文件中 children 部分

// 访问 /dashboard/order 时，使用 page 文件夹下的dashboard/order 组件渲染到 layout 文件中 children 部分

// 访问 /dashboard/count 时，使用 page 文件夹下的dashboard/count 组件渲染到 layout 文件中 children 部分
      path: '/',
      component: '../layout',
      routes: [
        // dashboard
        { path: '/', redirect: '/home/' },
        {
          path: '/dashboard',          
          routes: [
            { path: '/dashboard', component: 'home'}, 
            //用户模块
            { path: '/dashboard/user', component: 'dashboard/user/user.js' },
            { path: '/dashboard/user/detail', component: 'dashboard/user/detail.js' },
            { path: '/dashboard/count', component: 'dashboard/count' },
            //订单模块
            { path: '/dashboard/order', component: 'dashboard/order/order.js' },
          ],
        },
      ],
    },
  ];
  