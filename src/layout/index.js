import { Component } from 'react';
//注意这里我们除了从antd中引入了Layout布局组件，还引入了Menu菜单组件，Icon图标组件
import Link from 'umi/link';
import { Layout, Menu, Icon } from 'antd';

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;

export default class BasicLayout extends Component {
    render() {
        return (
          <Layout>
            <Sider width={256} style={{ minHeight: '100vh' }}>
              <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Link to="/home">
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
                   <Menu.Item key="4"><Link to="/dashboard/count">平台日志</Link></Menu.Item>
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
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {this.props.children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        )
      }
  }