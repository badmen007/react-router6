
function createBrowserHistory() {
  const globalHistory = window.history;
  let state;
  let listeners = [];
  function go(n) {
    globalHistory.go(n);
  }

  function goBack(n) {
    go(-1);
  }

  function goForward(n) {
    go(1);
  }

  window.addEventListener('onpopstate', () => {
    let location = {state: globalHistory.state, pathname: window.location.pathname}
    notify({action: 'POP', location})
  })

  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(item => item !== listener);
    }
  }

  /**
   * 
   * @param {*} pathname 可以传递一个对象   也可以传递一个字符串的路径
   * @param {*} nextState 
   */
  function push(pathname, nextState) {
    const action = 'PUSH';
    if(typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    }else{
      state = nextState;
    }
    globalHistory.pushState(state, null, pathname);
    let location = { state, pathname };
    notify({action, location})
  }

  function notify(newState) {
    Object.assign(history, newState);
    listeners.forEach(listener => listener({action: newState.action, location: newState.location}))
  }

  const history = {
    action: 'POP',
    go,
    goBack,
    goForward,
    push,
    listen,
    location: {pathname: window.location.pathname, state: window.location.state}
  }

  return history;
}

export default createBrowserHistory;