import { Row, Col ,Card ,Avatar } from 'antd';

import myStyles from './style.css';
import { Meta } from 'antd/lib/list/Item';

export default () => {
    return (
      <div className="gutter-example" >
        <div style={{marginBottom:'20px'}}>
          <span className={myStyles.title}>今日统计</span>
          <span style={{marginLeft:'20px'}}>最后统计时间：2018-10-25 10:29:08</span>
        </div>       
        <Row gutter={16} style={{marginTop:'20px'}}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="今日总收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="苹果收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="安卓收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop:'20px'}}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="今日总收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="苹果收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="安卓收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop:'20px'}}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="今日总收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="苹果收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
            <Card title="安卓收入" bordered={true}><strong>￥3987.88</strong></Card>
            </div>
          </Col>
        </Row>        
      </div>   
    );
  }