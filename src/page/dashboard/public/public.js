import { Upload, message, Button, Icon ,Input } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

class Public extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            fileUrl:"",
        }
    }

    componentDidMount() {

    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        const _this = this;
        fileList.forEach((file) => {
          formData.append('file[]', file);
        });
        this.setState({
          uploading: true,
        });
        var url = '/admin/react/file';
        axios.post(url,formData)
          .then(function (response) {
              if(response.data.msg != ""){
                  //全局提示
                  _this.setState({
                    fileList: [],
                    uploading: false,
                    fileUrl:response.data.msg,
                  });
                message.success('上传成功',1); 
              }else{
                  //全局提示
                _this.setState({
                    uploading: false,
                });
                message.error('上传失败',1);
              }
          })
    }

    render(){

        const { uploading } = this.state;
        const fileUrl = this.state.fileUrl;
        const props = {
        action: '/admin/react/file',
        onRemove: (file) => {
            this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
            });
        },
        beforeUpload: (file) => {
            this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
            }));
            return false;
        },
        fileList: this.state.fileList,
        };

        return (
            <div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 选择文件
              </Button>
            </Upload>
            <Button
              className="upload-demo-start"
              type="primary"
              onClick={this.handleUpload}
              disabled={this.state.fileList.length === 0}
              loading={uploading}
              style={{marginTop:"20px",marginBottom:"20px"}}
            >
              {uploading ? 'Uploading' : 'Start Upload' }
            </Button>
            <div>
            文件地址：<TextArea value={fileUrl} autosize />
            </div>
          </div>
        );
    }
}

export default Public;