export default {
    namespace: 'cards',
    state: {
      data: [
        {
          id: 1,
          setup: '1',
          punchline: '第1个标签',
        },
        {
          id: 2,
          setup: '2',
          punchline: '第2个标签',
        },
      ],
      counter: 2,
    },
    reducers: {
      addNewCard(state, { payload: newCard }) {
        //id计数
        const nextCounter = state.counter + 1;
        //内容
        const nextPunchline = '第'+ nextCounter +'个标签';
        //新增加的一条数据的内容
        const newCardWithId = { ...newCard, id: nextCounter,setup:nextCounter,punchline:nextPunchline };
        //将新增的数据concat到原data中
        const nextData = state.data.concat(newCardWithId);
        //return新的data
        return {
          data: nextData,
          counter: nextCounter,
        };
      }
    },
  };