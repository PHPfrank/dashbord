//import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
import * as usersService from '../service/user';
//使用 request 做 ajax 请求，该函数返回 Promise。


export default {
  namespace: 'users',
  state: {
    data: [],
    counter: 0,
      },
  //effects做ajax请求，拿到数据后异步展示    
  effects: {
    //queryInit:获取所有用户
    *getList({ payload : values }, { call, put, select }) {
      const users = yield call(usersService.all,values);
      yield put({ type: 'getAll', payload: users });
    },
    //getSingle:获取单个用户
    *getOne({ payload: user_id }, { call, put, select }) {
      const user = yield call(usersService.single, user_id);
      yield put({ type: 'getSingle', payload: user});
    },
  },
  reducers: {
    //reducers改变state后重新注入组件
    getAll(state , { payload: users }) {
      const userData = { ...users};
      return {
        users: userData.data.user,
      };
    },
    getSingle(state , { payload: user }) {
      const userData = { ...user};
      return {
        user: userData.data.user,
      };
    }
  },
};