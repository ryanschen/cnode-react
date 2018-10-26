import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './axios';
import FastClick from 'fastclick';
import 'normalize.css';
import App from './App.jsx'
// import 'antd-mobile/dist/antd-mobile.css';

if ('ontouchstart' in window) {
  FastClick.attach(document.body)
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
