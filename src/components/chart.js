import React from 'react';
import G2 from '@antv/g2';

const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 1150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

class SampleChart extends React.Component {
//componentDidMount 是 React 组件生命周期方法之一
//在组件被添加到真实文档后触发。因而我们在这时，ref 可以拿到当前真实的 dom 元素。    
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        // G2 初始化图形代码
        this.chart = new G2.Chart({
          // this.containerRef.current 即为引用
          container: this.containerRef.current,
          width: 450,
          height: 300
        });
    this.refreshChart();    
    }

    refreshChart = () => {
        // 接收 data 属性作为数据源
        //console.log(this.props.data);
        this.chart.source(this.props.data);
        // 此处为硬编码，配置源自 G2 官方示例： https://github.com/antvis/g2
        // 实际开发中需要封装，推荐直接使用 BizCharts。
        this.chart.interval().position('genre*sold').color('genre');
        this.chart.render();
      };

//此处我们看到了一个新的属性 ref，通过该属性我们可以获取经过 render 后的真实节点的引用。
//如果 ref 的节点是一个 dom 元素，那么你得到的是文档中真实的 dom 节点
//如果 ref 的节点是一个 component，那么你获得将是该 component 渲染后的实例。
//而在这里，我们获取的是 div 的 dom。

  render() {
    return (
      <div ref={this.containerRef} />
    );
  }
}

export default SampleChart;