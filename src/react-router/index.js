import React from 'react';
// 1.构建三个上下文
// 导航上下文 
export const NavigationContext = React.createContext();
// 路径上下文
export const LocationContext = React.createContext();
// 路由上下文
export const RouteContext = React.createContext();
/**
 * 
 * @param {*} children 子组件
 * @param {*} location 当前的路径对象
 * @param {*} navigator history对象
 */
export function Router({ children, location, navigator}) {
  const navigationContext = React.useMemo(() => ({ navigator }), [navigator]);
  const locationContext = React.useMemo(() => ({ location }), [location]);
  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider value={locationContext} children={children} />
    </NavigationContext.Provider>
  )
}

export function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children));
}

// 没什么实际的额作用  空组件就行了
export function Route() {

}

export function useLocation() {
  return React.useContext(LocationContext).location;
}

export function useRoutes(routes) {
  const location = useLocation();
  const pathname = location.pathname || '/';
  for(let i = 0; i < routes.length; i++) {
    const {path, element } = routes[i];
    let match = matchPath(path, pathname);
    if(match) {
      return element;
    }
  }
  return null;
}

function compilePath(path) {
  let paramNames = [];
  let regexpSource = '^' + path.replace(/:(\w+)/g,(_, key) => {
    paramNames.push(key);
    return '([^\\/]+)'
  });
  regexpSource += '$';
  let matcher = new RegExp(regexpSource);
  return [matcher, paramNames];
}

/**
 * 
 * @param {*} path 路由的路径
 * @param {*} pathname 浏览器地址栏中的路径
 */
export function matchPath(path, pathname) {
  let [matcher, paramNames] = compilePath(path);
  let match = pathname.match(matcher);
  if(!match) return null;
  let matchedPathname = match[0];
  let values = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = values[index];
    return memo;
  }, {})
  return {params, pathname: matchedPathname, match};
}


function createRoutesFromChildren(children) {
  let routes = [];
  React.Children.forEach(children, element => { // React.Children 什么时候用这个api 专门用来遍历子节点的
    let route = {
      path: element.props.path,
      element: element.props.element,
    }
    routes.push(route);
  })
  return routes;
}

export function useNavigate() {
  let { navigator } = React.useContext(NavigationContext); 
  let navigate = React.useCallback(to => navigator.push(to), [navigator]);  // 这个to挺有意思的
  return navigate;
}