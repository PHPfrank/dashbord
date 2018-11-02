import pageRoutes from './router.config';

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
      // 路由配置
    routes: pageRoutes,
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