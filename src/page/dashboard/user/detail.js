import React from 'react';
import { Form, Input, message,Select,Button,Avatar} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;

class UserDetail extends React.Component {

  //action触发model，获取页面数据
  // componentDidMount() {
  //   var user_id = this.props.location.query.user_id;
  //   //console.log(111);
  //   this.props.dispatch({
  //     type: 'users/getOne',
  //     payload: user_id,
  //   });
  // }

  constructor(props){
    super(props);
    this.state={
      user:[],
      isLoaded:false
    }
  }

  //action获取数据
  componentDidMount() {
     var url = '/admin/react/getAllUser';
     var user_id = this.props.location.query.user_id
     const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
      axios.get(url,{
        params: {
          user_id: user_id
          }
        })
        .then(function (response) {
          if(response.data.error == 0){
            _this.setState({
              user:response.data.data.user,
              isLoaded:true
            });
          }else{
            message.error('获取数据失败',1);
          }          
        })
  }

  //提交form
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var url = '/admin/react/editUser';
        axios.post(url,values)
          .then(function (response) {
              if(response.data.error == 0){
                  //全局提示
                message.success('操作成功',1); 
              }else{
                  //全局提示
                message.error('操作失败',1);
              }
          })
      }
    });
    //重新渲染
    this.componentDidMount()
  }


  render(){
  
    const { form: { getFieldDecorator } } = this.props;
    
    return(
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          label="记录ID"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          <span className="ant-form-text">{this.state.user.id}</span>
        </FormItem>
        <FormItem
          label="用户ID"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('user_id', {
            initialValue: this.state.user.user_id,
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          label="用户头像"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('avatar', {
            initialValue: this.state.user.avatar,
          })(
            <Avatar shape="square" size={128} src={this.state.user.avatar} icon="user" />
          )}
        </FormItem>
        <FormItem
          label="用户昵称"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('nickname', {
            initialValue: this.state.user.nickname,
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="用户状态"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('status', {
            initialValue: this.state.user.status,
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value={0} >正常</Option>
              <Option value={-1}>禁用</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            修改资料
          </Button>
        </FormItem>
    </Form>
    );
  }
}

const UserForm = Form.create()(UserDetail);

export default UserForm;

        