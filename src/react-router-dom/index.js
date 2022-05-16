import React from 'react';
import { createHashHistory, createBrowserHistory } from 'history'
import { Router } from '../react-router';
export * from '../react-router';

export function HashRouter({children}) {
  let historyRef = React.useRef();
  // 这个对象只会在刚开始的时候创建一次  后面就不在变化了  是单例的  
  // 这里就是个优化 只有第一次创建 
  if(!historyRef.current) {
    historyRef.current = createHashHistory();
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })
  React.useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router 
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

export function BrowserHistory({children}) {
  let historyRef = React.useRef();
  if(!historyRef) {
    historyRef.current = createBrowserHistory();
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })
  React.useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router 
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}