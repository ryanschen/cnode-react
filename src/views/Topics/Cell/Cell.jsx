import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import timeago from 'timeago.js'

export default class extends Component {
  render () {
    const timeagoInstance = timeago();
    return (
      <div>
        {this.props.list.map((item, index) =>
          <Link to={`/detail/${item.id}`} key={index}>
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
        )}
      </div>
    )
  }
}
