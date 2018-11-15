import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;


class Login extends React.Component {

    //提交form
  handleSubmit = (e) => {
    e.preventDefault();
    const _this=this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var url = "/admin/react/userLogin";
        axios.post(url,values)
          .then(function (response) {
              if(response.data.error == 0){
                message.success('登录成功',1);
                _this.props.history.push('/dashboard'); 
              }else{
                  //全局提示
                message.error('账号或密码错误',1);
              }
          })
      }
    });
  }

   
    render() {

      const { form: { getFieldDecorator } } = this.props;

      return (
        <div style={{position:'absolute',top:'0',bottom:'0',width:'100%',backgroundImage: "url(" + "https://wl2x7ve3z6yq9r6s.oss-cn-hangzhou.aliyuncs.com/2018-11-05/45e033a08523fc505743f1efa89b1ff0.jpg" + ")"}}>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{maxWidth:'300px',margin: '200px 600px',}}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请填写用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住账号</Checkbox>
          )}
          <a className="login-form-forgot" style={{float: 'right'}} href="">忘记密码</a>
          <Button type="primary" style={{width: '100%'}} htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      </div>
      );
    }
  }


const LoginForm = Form.create()(Login);

export default LoginForm;