import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise
//使用 request 做 ajax 请求，该函数返回 Promise。
const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'puzzlecards',
  state: {
    data: [],
    counter: 0,
      },
  //effects做ajax请求，拿到数据后异步展示    
  effects: {
    //queryInit:请求服务端异步处理
    *queryInitCards(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = '/dev/random_joke';
      //第一次获取服务端数据
      const puzzle = yield call(request, endPointURI);
      //添加一个卡片数据。这个会触发 reducer中addNewCard的执行。于是会看到视图上添加了一个新卡片。
      yield put({ type: 'addNewCard', payload: puzzle });
      //暂停1秒（更好的观察数据请求的变化）
      yield call(delay, 1000);
      //第二次获取服务端数据。
      const puzzle2 = yield call(request, endPointURI);
      //再添加一个卡片数据。这个又会触发 reducer 的执行。于是看到第二个卡片添加到视图上去。
      yield put({ type: 'addNewCard', payload: puzzle2 });
    }
  },
  reducers: {
    //reducers改变state后重新注入组件
    addNewCard(state, { payload: newCard }) {
      const nextCounter = state.counter + 1;
      const newCardWithId = { ...newCard, id: nextCounter };
      const nextData = state.data.concat(newCardWithId);
      return {
        data: nextData,
        counter: nextCounter,
      };
    }
  },
};
// export default {
//     namespace: 'cards',
//     state: {
//       data: [
//         {
//           id: 1,
//           setup: '1',
//           punchline: '第1个标签',
//         },
//         {
//           id: 2,
//           setup: '2',
//           punchline: '第2个标签',
//         },
//       ],
//       counter: 2,
//     },
// //reducer 干的事情和 React 中 setState(prevState => { ... }) 很像，都要返回一个新构造的对象，
// //但区别是：reducer 的返回值会 整个取代 (Replace) 老的 state，
// //而 setState 中回调函数的返回值是会融合(Merge)到老的 state 中去。
//     reducers: {
//       addNewCard(state, { payload: newCard }) {
//         //id计数
//         const nextCounter = state.counter + 1;
//         //内容
//         const nextPunchline = '第'+ nextCounter +'个标签';
//         //新增加的一条数据的内容
//         const newCardWithId = { ...newCard, id: nextCounter,setup:nextCounter,punchline:nextPunchline };
//         //将新增的数据concat到原data中
//         const nextData = state.data.concat(newCardWithId);
//         //return新的data
//         return {
//           data: nextData,
//           counter: nextCounter,
//         };
//       }
//     },
//   };