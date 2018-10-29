import React, { Component } from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
// import NotFound from '@/views/NotFound'
// import Home from '@/views/Home'
// import Getstart from '@/views/Getstart'
// import About from '@/views/About'

import Loadable from 'react-loadable'

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => <span>加载中...</span>,
  });
};
// const DelayLoading = () => (<div>loading ...</div>)

// const Home = Loadable({ loader: () => import('@/views/Home'), loading: DelayLoading, delay: 3000 })
// const Getstart = Loadable({ loader: () => import('@/views/Getstart'), loading: DelayLoading, delay: 3000 })
// const About = Loadable({ loader: () => import('@/views/About'), loading: DelayLoading, delay: 3000 })

const routes = [
  // { path: '/', exact: true, redirect: '/home' },
  // { path: '/home', component: 'Home' },
  // { path: '/getstart', component: 'Getstart' },
  // { path: '/about', component: 'About' },
  // { path: '*', component: 'NotFound' }

  { path: '/', exact: true, redirect: '/home' },
  { path: '/home', component: () => import(`@/views/Home`) },
  { path: '/getstart', component: () => import(`@/views/Getstart`) },
  { path: '/about', component: () => import(`@/views/About`) },
  { path: '/rydemo', component: () => import(`@/views/Rydemo`) },
  { path: '*', component: () => import(`@/views/NotFound`) }
  // { path: '/', exact: true, redirect: '/home' },
  // { path: '/home', component: Home },
  // { path: '/getstart', component: Getstart },
  // { path: '/about', component: About },
  // { path: '*', component: NotFound }
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
                  // component={route.component}
                  component={LoadableComponent(route.component)}
                />)
          })
        }
      </Switch>
    )
  }
}
