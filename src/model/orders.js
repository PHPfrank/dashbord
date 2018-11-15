//import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import * as ordersService from '../service/order';
//使用 request 做 ajax 请求，该函数返回 Promise。


export default {
  namespace: 'orders',
  state: {
    data: [],
    counter: 0,
      },
  //effects做ajax请求，拿到数据后异步展示    
  effects: {
    //queryInit:获取所有订单
    *getList({ payload : values }, { call, put, select }) {
      const orders = yield call(ordersService.all,values);
      yield put({ type: 'getAll', payload: orders });
    },
    //getSingle:获取单个订单
    *getOne({ payload: order_id }, { call, put, select }) {
      const order = yield call(ordersService.single, order_id);
      yield put({ type: 'getSingle', payload: order});
    },
  },
  reducers: {
    //reducers改变state后重新注入组件
    getAll(state , { payload: orders }) {
      const orderData = { ...orders};
      return {
        orders: orderData.data.order,
      };
    },
    getSingle(state , { payload: order }) {
      const orderData = { ...order};
      return {
        order: orderData.data.order,
      };
    }
  },
};