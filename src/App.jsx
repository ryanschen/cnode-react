import React, { Component } from 'react';
// import classnames from 'classnames'
// import logo from './assets/images/logo.svg';
import './assets/styles/App.sass';
import $ from './utils';
import Cell from './views/Cell'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabsList: [
        { name: '首页', type: '' },
        { name: '精华', type: 'good' },
        { name: '分享', type: 'share' },
        { name: '问答', type: 'ask' },
        { name: '招聘', type: 'job' }
      ],
      activeClass: 0,
      list: []
    }
  }

  async componentDidMount () {
    const response = await $.get('https://cnodejs.org/api/v1/topics')
      .catch(error => { console.log(error);})
    console.log(response);
    this.setState({
      list: response.data
    })
  }

  tabsClickHandle = async (item, index, e) => {
    console.log(item, index)
    // this.setState(prevState => ({
    //   activeClass: parseInt(e.target.dataset.index)
    // }))
    const response = await $.get('https://cnodejs.org/api/v1/topics', Object.assign({},
      item.type
        ? {
          tab: item.type
        }
        : {}
      ))
        .catch(error => { console.log(error); })
    console.log(response);
    this.setState({
      activeClass: index,
      list: response.data
    })
  }

  render () {
    return (
      <div className="app">
        <header className="app-header">
          <h1>CNode JS</h1>
        </header>

        <section className="app-tabs">
          {/* <TabsList items={this.state.tabsList} /> */}
          <ul>
            {this.state.tabsList.map((item, index) =>
              <li
                key={index}
                onClick={e => this.tabsClickHandle(item, index, e)}
                className={index === this.state.activeClass ? 'active' : ''}
              >{item.name}</li>
            )}
          </ul>
        </section>

        <section className="app-content">
          <Cell list={this.state.list}/>
        </section>
      </div>
    );
  }
}


// import { Button } from 'antd-mobile';
// class TabItem extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       activeClass: 0
//     }
//   }

//   tabsClickHandle = () => {
//     console.log(this.state.activeClass);
//   }

//   render () {
//     return (
//       <li
//         onClick={this.tabsClickHandle}
//         className={}
//       >{this.props.tabName}</li>
//     )
//   }
// }

// class TabsList extends Component {
//   render () {
//     const items = this.props.items;
//     const tabItems = items.map((tabName) =>
//       <TabItem key={tabName} tabName={tabName} />
//     );

//     return (
//       <ul>{tabItems}</ul>
//     )
//   }
// }
