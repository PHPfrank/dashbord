import { Component } from 'react';
//注意这里我们除了从antd中引入了Layout布局组件，还引入了Menu菜单组件，Icon图标组件
import Link from 'umi/link';
import { Layout, Menu, Icon ,Modal, message,Dropdown,Button,Input} from 'antd';
import axios from 'axios';

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;


export default class BasicLayout extends Component {

    state = { 
        visible: false ,
      }

    showModal = () => {
      this.setState({
        visible: true,
      });
    }

    hideModal = () => {
      this.setState({
        visible: false,
      });
    }

    //修改密码
    editPwd = () => {
      const origin_pwd = document.getElementById("origin_pwd").value;
      const new_pwd = document.getElementById("new_pwd").value;
      const url = '/admin/react/editUserPwd';
      const _this = this;
      axios.post(url, {
          origin_pwd: origin_pwd,
          new_pwd: new_pwd,
        })
        .then(function (response) {
            if(response.data.error == 0){
               //console.log(response.data);
                //全局提示
               message.success('修改成功',1);
               _this.setState({
                visible: false,
              }); 
            }else{
                //全局提示
               message.error('修改失败',1);
            }
        })
    }

    //用户退出
    userLogout = () => {
      const url = '/admin/react/userLogout';
      const _this=this;
      axios.post(url)
        .then(function (response) {
            if(response.data.error == 0){
                //全局提示
               message.success('退出成功',1);
               //延时跳转
               _this.timer = setTimeout(()=>{
                _this.props.history.push('/');
                },1500);            
            }else{
                //全局提示
               message.error('退出失败',1);
            }
        })
    }

    render() {
   
        return (
          <Layout>
            <Sider width={256} style={{ minHeight: '100vh' }}>
              <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/dashboard">
                  <Icon type="pie-chart" />
                  <span>后台主页</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="dashboard" /><span>后台管理</span></span>}
                >
                   <Menu.Item key="2"><Link to="/dashboard/user">用户管理</Link></Menu.Item>
                   <Menu.Item key="3"><Link to="/dashboard/order">订单管理</Link></Menu.Item>
                   <Menu.Item key="4"><Link to="/dashboard/public">通用功能</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout >
              <Header style={{ background: '#fff', margin: '0 0 0 0' }}>                
                  <Icon
                  className="trigger"
                  type={'menu-fold'}
                  style={{ fontSize: '30px'}}
                  />              
                <div style={{float:'right'}}>
                <Icon className="trigger" type="github" style={{ fontSize: '30px',marginRight:'30px'}}/>
                {/* <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="setting" style={{ fontSize: '30px',}}/>
                    设置
                  </a>                   */}
                  {/* <Button icon="setting" size = "large">设置</Button> */}
                {/* </Dropdown> */}
                <Dropdown overlay={
                  <Menu>
                  <Menu.Item key="0" >
                    <a onClick={this.showModal}>修改密码</a>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <a onClick={this.userLogout}>退出登录</a>
                  </Menu.Item>
                </Menu>
                } trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    <Icon type="setting" style={{ fontSize: '30px',}}/>
                    设置
                </a>                
                </Dropdown>
                <Modal
                      title="Modal"
                      visible={this.state.visible}
                      onOk={this.editPwd}
                      onCancel={this.hideModal}
                      destroyOnClose
                      okText="确认"
                      cancelText="取消"
                >
                <Input id="origin_pwd" autoComplete="off" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="原密码" />
                <Input id="new_pwd" autoComplete="off" style={{ marginTop:'30px'}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
                </Modal>
                </div>                
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {this.props.children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Powered by Frank</Footer>
            </Layout>
          </Layout>
        )
      }
  }