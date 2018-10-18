// 组件的概念
// jsx语法
// 必须闭合
// 顶层只能有一个标签
// HTML 原生标签使用小写，自定义的组件标签首字母大写
// 允许js与jsx混写，{}进入js上下文
// 组件定义
// 继承React.Component基类，重写render方法
// 标签属性传值：this.props
// 标签内容传值：this.props.children
// 组件内部状态：this.state
// 组件生命周期
// componentDidMount：组件挂载后自动调用
// componentWillUnmount：组件卸载前自动调用
// componentDidUpdate：UI 每次更新后调用

import React from 'react';

//this.props对象有一个非常特殊的参数this.props.children，表示当前组件“包裹”的所有内容。
//比如，上面代码里面的Shopping List for {this.props.name}，就是<h1>元素的this.props.children。
//这个属性在 React 里面有很大的作用，它意味着组件内部可以拿到，用户在组件里面放置的内容。

//主要区别：state是组件自己管理数据，控制自己的状态，值是可以改变的;props是外部传入的数据参数，不可变；

class ShoppingList extends React.Component {
    //render()组件输出
    render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

export default ShoppingList;