import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './assets/styles/App.sass';

import { Button } from 'antd-mobile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="sass-test">
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button type="primary" size="large">Start</Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
