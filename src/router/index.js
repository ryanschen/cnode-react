import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => (<span>加载中...</span>)
  })
}

const routes = [
  { path: '/', exact: true, redirect: '/topics' },
  { path: '/topics', component: () => import(`@/views/Topics`) },
  { path: '/getstart', component: () => import(`@/views/Getstart`) },
  { path: '/about', component: () => import(`@/views/About`) },
  { path: '/rydemo', component: () => import(`@/views/Rydemo`) },
  { path: '/detail/:id', component: () => import(`@/views/Detail`) },
  { path: '*', component: () => import(`@/views/NotFound`) }
]

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
                  component={LoadableComponent(route.component)}
                />)
          })
        }
      </Switch>
    )
  }
}
