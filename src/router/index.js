import React, { Component } from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import NotFound from '@/views/NotFound'
import Home from '@/views/Home'
import News from '@/views/News'
import About from '@/views/About'

const routes = [
  { path: '/', exact: true, redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/news', component: News },
  { path: '/about', component: About },
  { path: '*', component: NotFound }
];

export default class extends Component {
  render () {
    return (
      <Switch>
        {
          routes.map((route, index) => {
            return route.redirect
              ? (<Redirect
                  key={index}
                  exact={route.exact}
                  from={route.path}
                  to={route.redirect}
                />)
              : (<Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />)
          })
        }
      </Switch>
    )
  }
}
