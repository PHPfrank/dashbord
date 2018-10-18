//按照功能划分，一张网页可以由多个互相独立的功能单位组成，这种功能单位就叫做“组件”（component）。
//比如，典型的网页分成页头、内容、页尾三个部分，就可以写成三个组件：Header、Content、Footer。
//这些组件拼装在一起，就构成了一张页面。

// export default () => {
//     return <div>hello react</div>;
//   }
import React from 'React';
import ShoppingList from './shoppinglist.js';

class Content extends React.Component {
  render() {
    return (
      <ShoppingList name="李四">
        <div>
            <h2>react.js</h2>
        </div>
      </ShoppingList>
    );
  }
}

export default Content;