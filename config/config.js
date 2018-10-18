export default {
    singular: true,
    plugins: [
        [
          'umi-plugin-react', {
          antd: true,
          dva: true,
        }
        ],
      ],
// 访问 / 下面的路由的时，使用 page 文件夹下的 ../layout 布局文件渲染页面，默认展示hello组件

// 访问 /dashboard/user 时，使用 page 文件夹下的dashboard/user 组件渲染到 layout 文件中 children 部分

// 访问 /dashboard/order 时，使用 page 文件夹下的dashboard/order 组件渲染到 layout 文件中 children 部分

// 访问 /dashboard/count 时，使用 page 文件夹下的dashboard/count 组件渲染到 layout 文件中 children 部分
      routes: [{
        path: '/',
        //路由匹配时layout下组件会被渲染
        component: '../layout',
        routes: [
          {
            path: '/',
            component: './hello'
          },
          {
            path: '/card',
            component: './puzzlecards'
          },
          {
            path: '/dashboard',
            routes: [
              { path: '/dashboard/user', component: 'dashboard/user' },
              { path: '/dashboard/order', component: 'dashboard/order' },
              { path: '/dashboard/count', component: 'dashboard/count' }
            ]
          },
        ]
      }],
};