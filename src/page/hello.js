import { Card, Icon, Avatar } from 'antd';

export default () => {
    const style = {
      width: '400px',
      padding : '0px',
      margin: '50px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      border: '1px solid #e8e8e8',
    };
    
    return (
        <Card style={style} hoverable={true} actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />,<a>查看详情</a>]} cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}>
        <Card.Meta
          avatar={<img 
            alt=""
            style={{ width: '64px', height: '64px', borderRadius: '32px' }}
            src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
          />}
          title="react"
          description="state是组件自己管理数据，控制自己的状态，值是可以改变的;props是外部传入的数据参数，不可变"
        />
      </Card>
    );
  }