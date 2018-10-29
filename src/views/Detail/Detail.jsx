import React, { Component } from 'react'
import $ from '@/utils'
import { REQ_URL } from '@/config'
import timeago from 'timeago.js'
const timeagoInstance = timeago();

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {
        author: {},
        content: '',
        replies: []
      }
    }
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    const response = await $.get(`${REQ_URL}/topic/${id}`)
      .catch(error => {console.log(error);})
    console.log(response)
    this.setState({
      detail: response.data
    })
  }

  getContentCode () {
    return { __html: this.state.detail.content };
  }
  getReplieCode(replie) {
    return { __html: replie.content };
  }

  render () {
    return (
      <div className="topics-detail">
        <h2>{this.state.detail.title}</h2>
        <p className="tip">·发布于：{timeagoInstance.format(this.state.detail.create_at, 'zh_CN')}
          ·作者：{this.state.detail.author.loginname} ·{this.state.detail.visit_count}次浏览</p>
        <div dangerouslySetInnerHTML={this.getContentCode()}></div>
        <p className="reply-count">{this.state.detail.reply_count}回复</p>
        {
          this.state.detail.replies.map((replie, index) => {
            return (
              <div key={index} className="replie">
                <img src={replie.author.avatar_url} alt="replie_avatar_url" className="avatar"/>
                <span className="replie-time">
                  <span >{replie.author.loginname} </span>
                  <span> {index + 1}楼 </span>
                  <span className="create_at"> ·{timeagoInstance.format(replie.create_at, 'zh_CN')}</span>
                </span>
                <p dangerouslySetInnerHTML={this.getReplieCode(replie)} className="replie-content"></p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
