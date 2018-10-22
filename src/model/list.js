import request from '../util/request';

export default {
  namespace : 'cards',
  state     : {
    cardsList: [ ]
  },
  effects: {
    * queryList(_, sagaEffects) {
      const listData = [{
        id   : 1,
        name : 'IG',
        desc : 'IG',
        url  : 'https://umijs.org'
      },
      {
        id   : 2, 
        name : 'EDG',
        desc : 'EDG',
        url  : 'https://ant.design/index-cn'
      },
      {
        id   : 3, 
        name : 'RNG',
        desc : 'RNG',
        url  : 'https://ant.design/index-cn'
      }
      ];
      const { call, put } = sagaEffects;
      //yield call(delay, 3000);
      yield put({ type: 'initList', payload: listData });
    }
  },
  reducers: {
    initList(state, {payload}) {
      const cardsList = [...payload];
      return {
        cardsList
      };
    }
  }
};