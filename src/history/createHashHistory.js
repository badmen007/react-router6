

function createHashHistory() {
  
  let historyStack = [];
  let index = -1;
  let action = 'POP';

  let state;

  let listeners = [];
  
  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(item => item !== listener);
    }
  }

  function go(n) {
    action = 'POP';
    index += n;
    let nextLocation = historyStack[index];
    state = nextLocation.state;
    window.location.hash = nextLocation.pathname;
  }


  function goBack(n) {
    go(-1);
  }

  function goForward(n) {
    go(1);
  }

  function hashChangeHandler() {
    let pathname = window.location.hash.slice(1);
    Object.assign(history, { action, location:{ state, pathname}})
    listeners.forEach(listener => listener({action: history.action, location: history.location}))
  }

  function push(pathname, nextState) {
    action = 'PUSH';
    if(typeof pathname === 'object') {
      state = pathname.state;
      pathname = pathname.pathname;
    }else{
      state = nextState;
    }
    window.location.hash = pathname;
  }

  window.addEventListener('hashchange', hashChangeHandler);

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

export default createHashHistory;