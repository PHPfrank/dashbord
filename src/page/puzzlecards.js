import React, { Component } from 'react';
import { Card , Button } from 'antd';

export default class PuzzleCardsPage extends Component {
  constructor(props) {
    super(props);
    this.counter = 2;
    this.state = {
      cardList: [
        {
          id: 1,
          setup: '第一个标签模块²⁰¹⁷₁₂.₁₄?',
          punchline: '111',
        },
        {
          id: 2,
          setup: '第二个标签模块²⁰¹⁷₁₂.₁₄?',
          punchline: '222',
        },
      ],
    }
  }

  //增加一个card , 点击触发addNewCard方法 
  addNewCard = () => {
    this.setState(prevState => {
      const prevCardList = prevState.cardList;
      this.counter += 1;
      const card = {
        id: this.counter,
        setup: '第' + this.counter + '个标签模块²⁰¹⁷₁₂.₁₄?',
        punchline: this.counter+''+this.counter+''+this.counter,
      };
      return {
        cardList: prevCardList.concat(card),
      };
    });
  }

  render() {
    return (
      <div>
        {
          this.state.cardList.map(card => {
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
        <div>
          <Button onClick={this.addNewCard}> 添加卡片 </Button>
        </div>
      </div>
    );
  }
}