import React, { Component } from 'react'
import Cell from './Cell'
import $ from '@/utils'
import { Toast } from 'antd-mobile'

const tabsList = [
  { name: '全部', type: '' },
  { name: '精华', type: 'good' },
  { name: '分享', type: 'share' },
  { name: '问答', type: 'ask' },
  { name: '招聘', type: 'job' }
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: '',
      activeClass: 0,
      list: []
    }
  }

  async componentDidMount() {
    Toast.loading('加载中..', 0)
    const response = await $.get('https://cnodejs.org/api/v1/topics', {
      tab: this.state.tab,
      page: 1,
      limit: 10
    })
      .catch(error => { console.log(error); })
    response.data && this.setState({ list: response.data })
  }

  tabsClickHandle = async (item, index, e) => {
    if (this.state.activeClass === index) return
    Toast.loading('加载中..', 0)
    const response = await $.get('https://cnodejs.org/api/v1/topics', Object.assign({},
      item.type ? { tab: item.type, page: 1, limit: 10 } : { page: 1, limit: 10 }
    ))
      .catch(error => { console.log(error); })
    console.log(response)
    response.data && this.setState({ activeClass: index, list: response.data, tab: item.type })
  }

  render () {
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

        <section className="app-content">
          <Cell list={this.state.list} />
        </section>
      </div>
    )
  }
}
