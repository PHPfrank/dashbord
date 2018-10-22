import React from 'react';
//引入table 和 connect(表格)
import { Table, Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class List extends React.Component {
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '链接',
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>,
    },
  ];
  //对于 Modal 组件，我们可以通过 visible 属性来控制是否显示。
  state = {
    visible: false,
  };
  //为按钮添加相应事件，使其可以改变 state 中 visible 的值。
  showModal = () => {
    //设置this.state.visible的值
    this.setState({ visible: true });
    //console.log(this.state.visible);
  };

  //关闭新建窗口
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  //提交新建
  handleOk = () => {
    const { dispatch, form: { validateFields } } = this.props;
  
    validateFields((err, values) => {
      // if (!err) {
      //   dispatch({
      //     type: 'cards/addOne',
      //     payload: values,
      //   });
      //   // 重置 `visible` 属性为 false 以关闭对话框
      //   this.setState({ visible: false });
      // }
      console.log(values);
      this.setState({ visible: false });
    });
  }

  //action触发model下的queryList
  componentDidMount() {
    this.props.dispatch({
      type: 'cards/queryList',
    });
  }
  
  render() {
    const { visible } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    const { cardsList, cardsLoading } = this.props;
  
    return (
      <div>
        <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
        <Button onClick={this.showModal}>新建</Button>
        <Modal
          title="新建记录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="描述">
              {getFieldDecorator('desc')(
                <Input />
              )}
            </FormItem>
            <FormItem label="链接">
              {getFieldDecorator('url', {
                rules: [{ type: 'url' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }

  // ...
}

function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList'],
  };
}
//使用export default命令，为模块指定默认输出(Form.create()(List)创建一个高阶组件)
export default connect(mapStateToProps)(Form.create()(List));
