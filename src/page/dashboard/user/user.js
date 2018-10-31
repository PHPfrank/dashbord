import { Table , Button , Avatar ,message } from 'antd';
import { connect } from 'dva';
import axios from 'axios';

class User extends React.Component{
  
    columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户ID',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '姓名',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render:(_,{ avatar }) => {
          return <Avatar shape="square" size={64} src={ avatar} icon="user" />
        }
      },
      {
        title: '状态',
        dataIndex: '',
        render: (_, { status,user_id }) => {        
          if(status == 0){
            return (
            <Button type="danger" onClick={() => { this.cancel(user_id); }}>注销用户</Button>
          );
          }else{
            return (
              <Button type="primary" onClick={() => { this.cancel(user_id); }}>解禁用户</Button>
            );
          }         
        },
      },
      { title: '操作', dataIndex: '', render: (_,{user_id}) => <a href={"./user/detail?user_id=" + user_id}>查看详情</a> },
    ];

    //注销用户
    cancel = (user_id) => {
      var url = '/admin/react/cancel';
      const _this=this;
      axios.get(url,{
        params: {
          user_id: user_id
          }
        })
        .then(function (response) {
            if(response.data.error == 0){
                //全局提示
               message.success('操作成功',1); 
               //重新加载数据
               _this.props.dispatch({
                type: 'users/getList',
              }); 
            }else{
                //全局提示
               message.error('操作失败',1);
            }
        }) 
    };

    //action触发model，获取页面数据
    componentDidMount() {
      this.props.dispatch({
        type: 'users/getList',
      });
    }

    render() {
      
        const { userData } = this.props;
        
        return (
            <div className="gutter-example" >
              <Table rowKey="id" dataSource={userData} columns={this.columns} />
            </div>   
          );
    }  

}

function mapStateToProps(state) {
    //console.log(state);
    return {
      userData:state.users.users,
    };
  }

export default connect(mapStateToProps)(User);