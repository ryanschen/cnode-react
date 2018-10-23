import React, { Component } from 'react'

export default class Home extends Component {
  render () {
    return (
      <ul>
        {this.props.list.map((item, index) =>
          <div key={index} className="item">
            {/* onClick={e => this.tabsClickHandle(tabname, index, e)} */}
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
                <span>{item.last_reply_at}</span>
              </p>
            </div>
          </div>
        )}
      </ul>
    )
  }
}
