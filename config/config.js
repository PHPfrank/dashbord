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
            component: './home'
          },
          {
            path: 'index',
            component: './index'
          },
          {
            path: 'card',
            component: './puzzlecards'
          },
          {
            path: 'list',
            component: './list'
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
  //配置的含义是：去往本地服务器 localhost:8000 的 ajax 调用中，如果是以 /dev 开头的，
  //那么就转发到远端的 https://08ad1pao69.execute-api.us-east-1.amazonaws.com 服务器当中，/dev 也会保留在转发地址中。   
      proxy: {
          '/dev': {
            target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
          },
          //v1接口转发api
          '/admin': {
            target: 'http://pin.com',
            changeOrigin: true,
          },
        },
};