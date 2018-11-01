import { Table,Button,Avatar,message,Form,Select,Input,DatePicker,LocaleProvider} from 'antd';
import { connect } from 'dva';
import axios from 'axios';
import myStyles from '../../style.css';
import zhCN from 'antd/lib/locale-provider/zh_CN';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array'}],
};

class User extends React.Component{

    constructor(props){
      super(props);
      this.state={
        created_at:"",
      }
    }
  
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
        payload:{},
      });
    }

    //提交form筛选
    handleSubmit = (e) => {
      e.preventDefault();
      //form表单处理
      this.props.form.validateFields((err, values) => {
        // Should format date value before submit.
        values['created_at'] = this.timeHandle(values['created_at']);
        if (!err) {
          //console.log(this.state);
          this.props.dispatch({
            type: 'users/getList',
            payload:values,
          });
        }
      });
    }
    
    //时间处理
    timeHandle(rangeValue){
      if(rangeValue){
        var new_time = rangeValue[0].format('YYYY-MM-DD HH:mm:ss') + " - " + rangeValue[1].format('YYYY-MM-DD HH:mm:ss');
      }else{
        var new_time = this.state.created_at;
      }
      return new_time;
    }

    render() {
      
        const { userData } = this.props;

        const { getFieldDecorator } = this.props.form;
        
        return (
          <div>
            <div style={{marginBottom:'20px'}}>
            <span className={myStyles.title}>用户管理</span>
            </div>
            <div>
              <LocaleProvider locale={zhCN}>
              <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:"20px"}}>
                <FormItem
                  label="昵称"
                  labelCol = {{ span: 6 }}
                  wrapperCol = {{ span: 18 }}
                >{getFieldDecorator('nickname', {
                  initialValue: "",
                })(
                  <Input placeholder="" />
                )}               
                </FormItem>
                <FormItem
                  label="性别"
                >{getFieldDecorator('sex', {
                  initialValue: "0",
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="0">不限</Option>
                    <Option value="1">男</Option>
                    <Option value="2">女</Option>
                  </Select>
                )}
                </FormItem>
                <FormItem
                  label="注册时间"
                >
                  {getFieldDecorator('created_at', rangeConfig)(                 
                      <RangePicker 
                      showTime 
                      format="YYYY-MM-DD HH:mm:ss" 
                      />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">查询</Button>
                </FormItem>
              </Form>
              </LocaleProvider>
            </div> 
            <div className="gutter-example" >
              <Table rowKey="id" dataSource={userData} columns={this.columns} />
            </div>
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

export default connect(mapStateToProps)(Form.create()(User));