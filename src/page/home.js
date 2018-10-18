class Card extends Component {
    render () {
      return (
        <div className='card'>
          <div className='card-content'>
            {this.props.content}
          </div>
        </div>
      )
    }
  }
  
  // 比如渲染包含 “Ant Design 实战教程” 字样的div
  ReactDOM.render(
    <Card>
      <div>
        Ant Design 实战教程
      </div>
    </Card>,
    document.getElementById('root')
  )