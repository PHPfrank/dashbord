//引入css样式
import myStyles from './style.css';
import { Button } from 'antd';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
  
    }
  
    componentWillUnmount() {
  
    }
  
    componentDidUpdate() {
    
    }
  
    render() {
      //在 React 的语境下，我们使用 className来定义一个 html元素的 class，而非 w3c 标准中的 class 保留字
      return (
        <div>
          <h1 className={myStyles.hello}>Hello, world!</h1>
          <h2 className={myStyles.time}>It is {this.state.date.toLocaleTimeString()}.</h2>
          <Button className={myStyles.button} type="primary" icon="search">按钮1</Button><br></br>
          <Button className={myStyles.button} type="danger" shape="circle" loading></Button>
        </div>
      );
    }
  }

  export default Clock;