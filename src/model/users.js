import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
//使用 request 做 ajax 请求，该函数返回 Promise。
const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'users',
  state: {
    data: [],
    counter: 0,
      },
  //effects做ajax请求，拿到数据后异步展示    
  effects: {
    //queryInit:请求服务端异步处理
    *getList(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = '/admin/react/getAllUser';
      //获取服务端数据
      const user = yield call(request, endPointURI);
      //添加一个卡片数据。这个会触发 reducer中addNewCard的执行。于是会看到视图上添加了一个新卡片。
      yield put({ type: 'getUser', payload: user });
    }
  },
  reducers: {
    //reducers改变state后重新注入组件
    getUser(state , { payload: user }) {
      const userData = { ...user};
      return {
        data: userData.data.user,
      };
    }
  },
};