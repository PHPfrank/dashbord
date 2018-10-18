//除了接受外部参数，组件内部也有不同的状态。React 规定，组件的内部状态记录在this.state这个对象上面。

class Square extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 333,
      };
    }
  
    render() {
      return (
        //点击设置value值
        <button
          className="square"
          onClick={() => this.setState({value: '222'})}
        >
          {this.state.value}
        </button>
      );
    }
  }

  export default Square;