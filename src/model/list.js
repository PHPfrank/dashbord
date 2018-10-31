import request from '../util/request';

export default {
  namespace : 'cards',
  state     : {
    cardsList: [],
    statistic: {},
  },
  effects: {
    * queryList(_, sagaEffects) {
      const listData = [{
        id   : 1,
        name : '111',
        desc : '111',
        url  : 'https://umijs.org'
      },
      {
        id   : 2, 
        name : '222',
        desc : '222',
        url  : 'https://ant.design/index-cn'
      },
      {
        id   : 3, 
        name : '333',
        desc : '333',
        url  : 'https://ant.design/index-cn'
      }
      ];
      const { call, put } = sagaEffects;
      //yield call(delay, 3000);
      yield put({ type: 'initList', payload: listData });
    },
    * getStatistic({ payload }, { call, put }) {     
      const chartData = [
        { genre: 'Sports', sold: 1000 },
        { genre: 'Strategy', sold: 1150 },
        { genre: 'Action', sold: 1200 },
        { genre: 'Shooter', sold: 500 },
        { genre: 'Other', sold: 60 },
      ];

      yield put({ type: 'saveStatistic',payload: {
        id: payload,
        data: chartData,
      },});
    },
  },
  reducers: {
    initList(state, { payload }) {
      const cardsList = [...payload];
      //console.log(cardsList);
      return {
        ...state,
        cardsList,
      }
    },
    saveStatistic(state, { payload: { id, data } }) {
      return {
        ...state,
        statistic: {
          ...state.statistic,
          [id]: data,
        },
      }
    },
  }
};