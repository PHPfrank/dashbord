import { Table,Button,Avatar,message,Form,Select,Input,DatePicker,LocaleProvider,Modal} from 'antd';
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

class Order extends React.Component{

    constructor(props){
      super(props);
      this.state={
        created_at:"",
        visible:false,
        order:{},
      }
    }
  
    columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '订单ID',
        dataIndex: 'order_no',
        key: 'order_no',
      },
      {
        title: '用户ID',
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '订单金额',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '商品图片',
        dataIndex: 'good_image',
        key: 'good_image',
        render:(_,{ good_image }) => {
          return <Avatar shape="square" size={98} src={good_image} icon="" />
        }
      },
      {
        title: '订单状态',
        dataIndex: '',
        render: (_, { status,id }) => {        
          if(status == 0){
            return (
                "待支付"
          );
          }else{
            return (
                "支付完成"
            );
          }         
        },
      },
      { title: '操作', 
        dataIndex: '',
        render: (_, { id }) => {        
            return (
            <Button type="primary" onClick={() => { this.showModal(id); }}>查看详情</Button>
            );        
        },
       }
    ];

    //action触发model，获取页面数据
    componentDidMount() {
      this.props.dispatch({
        type: 'orders/getList',
        payload:{},
      });
    }
   
    //显示弹窗
    showModal = (id) => {
        var url = '/admin/react/getSingleOrder';
        const _this=this;
        axios.get(url,{
            params: {
                order_id: id
                }
            })
            .then(function (response) {
                if(response.data.error == 0){
                    _this.setState({
                        visible: true,
                        order:response.data.data.order,
                      });
                }else{
                message.error('获取数据失败',1);
                }          
            })   
      }

    handleOk = (e) => {
        //console.log(this.state.text.word);
        this.setState({
          visible: false,
        });
      }
    
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
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
      
        const { orderData } = this.props;

        const { getFieldDecorator } = this.props.form;
        
        return (
          <div>
            <div style={{marginBottom:'20px'}}>
            <span className={myStyles.title}>订单管理</span>
            </div>
            <div>
              <LocaleProvider locale={zhCN}>
              <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom:"20px"}}>
                <FormItem
                  label="用户ID"
                  labelCol = {{ span: 6 }}
                  wrapperCol = {{ span: 18 }}
                >{getFieldDecorator('user_id', {
                  initialValue: "",
                })(
                  <Input placeholder="" />
                )}               
                </FormItem>
                <FormItem
                  label="订单状态"
                >{getFieldDecorator('status', {
                  initialValue: "",
                })(
                  <Select style={{ width: 100 }}>
                    <Option value="">不限</Option>
                    <Option value="0">待支付</Option>
                    <Option value="1">支付完成</Option>
                    <Option value="1">支付失败</Option>
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
              <Table rowKey="id" dataSource={orderData} columns={this.columns} />
            </div>
            <div>
            <Modal
                title="订单详情"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <Form>
                    <FormItem
                    label="下单用户ID"
                    labelCol = {{ span: 4 }}
                    wrapperCol = {{ span: 18 }}
                    >{getFieldDecorator('user_id', {
                    initialValue: this.state.order.user_id,
                    })(
                    <Input placeholder="" />
                    )}               
                    </FormItem>
                    <FormItem
                    label="金额"
                    labelCol = {{ span: 4 }}
                    wrapperCol = {{ span: 18 }}
                    >{getFieldDecorator('amount', {
                    initialValue: this.state.order.amount,
                    })(
                    <Input placeholder="" />
                    )}               
                    </FormItem>
                    <FormItem
                    label="买家姓名"
                    labelCol = {{ span: 4 }}
                    wrapperCol = {{ span: 18 }}
                    >{getFieldDecorator('user_name', {
                    initialValue: this.state.order.user_name,
                    })(
                    <Input placeholder="" />
                    )}               
                    </FormItem>
                    <FormItem
                    label="买家手机号"
                    labelCol = {{ span: 4 }}
                    wrapperCol = {{ span: 18 }}
                    >{getFieldDecorator('user_phone', {
                    initialValue: this.state.order.user_phone,
                    })(
                    <Input placeholder="" />
                    )}               
                    </FormItem>
                    <FormItem
                    label="收货地址"
                    labelCol = {{ span: 4 }}
                    wrapperCol = {{ span: 18 }}
                    >{getFieldDecorator('user_address', {
                    initialValue: this.state.order.user_address,
                    })(
                    <Input placeholder="" />
                    )}               
                    </FormItem>
                </Form>               
            </Modal>
            </div>
          </div>  
          );
    }  

}

function mapStateToProps(state) {
    //console.log(state);
    return {
      orderData:state.orders.orders,
    };
  }

export default connect(mapStateToProps)(Form.create()(Order));