import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { ListView, Toast } from 'antd-mobile'
import $ from '@/utils'
import timeago from 'timeago.js'

const timeagoInstance = timeago()

class MyBody extends Component {
  render () {
    return (
      <div className="am-list-body my-body">
        {this.props.children}
      </div>
    )
  }
}

const tabsList = [
  { name: '全部', type: '' },
  { name: '精华', type: 'good' },
  { name: '分享', type: 'share' },
  { name: '问答', type: 'ask' },
  { name: '招聘', type: 'job' }
]

let dataSource = []
let pageIndex = 1

export default class extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
      activeClass: 0,
      tab: ''
    }
  }

  async componentDidMount() {
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop

    Toast.loading('加载中..', 0)
    if (pageIndex !== 1) {
      pageIndex = 1
    }
    const response = await $.get('/topics', {
      tab: this.state.tab,
      page: pageIndex,
      limit: 10
    })
      .catch(error => { console.log(error) })
    if (response.data) {
      dataSource = response.data
      this.setState({
       dataSource: this.state.dataSource.cloneWithRows(dataSource),
       isLoading: false,
       height: hei
     })
    }
  }

  onEndReached = async (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    this.setState({ isLoading: true })
    Toast.loading('加载中..', 0)
    const response = await $.get('/topics', {
      tab: this.state.tab,
      page: pageIndex + 1,
      limit: 10
    })
      .catch(error => { console.log(error) })

    console.log('dataSource:', dataSource)
    if (response.data) {
      dataSource = dataSource.concat(response.data)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataSource),
        isLoading: false
      })
      pageIndex = pageIndex + 1
    }
  }

  tabsClickHandle = async (item, index, e) => {
    if (this.state.activeClass === index) return
    this.lv.scrollTo(0, 0)
    this.setState({ isLoading: true })
    Toast.loading('加载中..', 0)
    const response = await $.get('/topics', Object.assign({},
      item.type ? { tab: item.type, page: 1, limit: 10 } : { page: 1, limit: 10 }
    ))
      .catch(error => { console.log(error) })
    console.log(response)
    if (response.data) {
      dataSource = response.data
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataSource),
        isLoading: false,
        activeClass: index,
        tab: item.type
      })
      pageIndex = 1
    }
  }

  renderRow = (rowData, sectionID, rowID) => {
    const item = rowData
    return (
      <Link to={`/detail/${item.id}`} key={rowID}>
        <div className="item">
          <img
            src={item.author.avatar_url}
            alt={item.author.loginname}
            className="author-img" />
          <span
            style={{ 'display': item.top ? '' : 'none' }}
            className="item-type">置顶</span>
          <span
            style={{ 'display': !item.top && item.good ? '' : 'none' }}
            className="item-type">精华</span>
          <span
            style={{ 'display': !item.top && !item.good && item.tab === 'ask' ? '' : 'none' }}
            className="item-type ask">问答</span>
          <span
            style={{ 'display': !item.top && !item.good && item.tab === 'share' ? '' : 'none' }}
            className="item-type share">分享</span>
          <span
            style={{ 'display': !item.top && !item.good && item.tab === 'job' ? '' : 'none' }}
            className="item-type share">招聘</span>
          <div className="item-title-wrap">
            <p className="item-title">{item.title}</p>
            <p className="item-count">
              <span>{item.reply_count}/{item.visit_count}</span>
              <span>{timeagoInstance.format(item.last_reply_at, 'zh_CN')}</span>
            </p>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    return (
      <div>
        <section className="topics-tabs">
          <ul>
            {tabsList.map((item, index) =>
              <li
                key={index}
                onClick={() => this.tabsClickHandle(item, index)}
                className={index === this.state.activeClass ? 'active' : ''}
              >{item.name}</li>
            )}
          </ul>
        </section>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderBodyComponent={() => <MyBody />}
          renderRow={this.renderRow}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }
}
