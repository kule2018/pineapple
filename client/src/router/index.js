import React, {
  useState,
  useEffect,
} from 'react';
import {
  createHashHistory,
  // createBrowserHistory,
} from 'history';
// import ReactDOM from 'react-dom';


// 历史对象
export const history = createHashHistory();

// 路由
function App(props) {
  const [Page, setPage] = useState(null);
  const router = {
    '/': {
      url: 'view/home/index',
      title: '菠萝监控系统主页',
    },
    '/error': {
      url: 'view/error/index',
      title: '错误分析',
    },
    '/monitor': {
      url: 'view/monitor/index',
      title: '性能分析',
    },
  };

  function setTitle(title) {
    document.title = title;
  }
  async function route(location) {
    const { pathname } = location;
    // console.log(pathname);
    const pageObj = router[pathname] || router['/'];
    const moudle = await import(`../${pageObj.url}`);
    const View = moudle.default;
    props.callback(); // 刷新侧边栏和面包屑
    setPage(<View {...props} />);
    setTitle(pageObj.title);
  }
  useEffect(() => {
    route(history.location);
    history.listen((location) => {
      route(location);
    });
  }, []);
  return Page;
}

export default App;