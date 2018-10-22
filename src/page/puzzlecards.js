import React, { Component } from 'react';
import { Card /* ,Button */ } from 'antd';
import { connect } from 'dva';

//定义命名空间
const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
  //获取命名空间定义model中的数据
  const cardList = state[namespace].data;
  return {
    cardList,
  };
};

const mapDispatchToProps = (dispatch) => {
  //页面事件触发dispatch
  return {
    onDidMount: () => {
      dispatch({
        //action触发model下的queryInitCards
        type: `${namespace}/queryInitCards`,
      });
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
  componentDidMount() {
    //执行onDidMount()
    this.props.onDidMount();
  }
  render() {
    return (
      <div>
        {
          this.props.cardList.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A: {card.punchline}</strong>
                </div>
              </Card>
            );
          })
        }
      </div>
    );
  }
}
// import React, { Component } from 'react';
// import { Card ,Button } from 'antd';
// import { connect } from 'dva';

// const namespace = 'cards';

// const mapStateToProps = (state) => {
//   //state['card'].data
//   const cardList = state[namespace].data;
//   return {
//     cardList,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onClickAdd: (newCard) => {
//       const action = {
//         type: `${namespace}/addNewCard`,
//         payload: newCard,
//       };
//       dispatch(action);
//     },
//   };
// };

// @connect(mapStateToProps, mapDispatchToProps)
// export default class PuzzleCardsPage extends Component {
//   render() {
//     return (
//       <div>
//         {
//           this.props.cardList.map(card => {
//             return (
//               <Card key={card.id}>
//                 <div>Q: {card.setup}</div>
//                 <div>
//                   <strong>A: {card.punchline}</strong>
//                 </div>
//               </Card>
//             );
//           })
//         }
//         <div>
//           <Button onClick={() => this.props.onClickAdd({
//             setup: '',
//             punchline: '',
//           })}> 添加卡片 </Button>
//         </div>
//       </div>
//     );
//   }
// }