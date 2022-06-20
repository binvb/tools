import React, { useRef, useState } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import customMenuDate from './customMenu';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import routes, { RouteOption } from './routes'
import Header from './components/common/header'
import request from './services/axios/index'


async function waitTime(time = 100) {
  const data = await request.get<{data: {name: string}}>('/test')
  console.log(111111111111)
  return new Promise((resolve) => {
    setTimeout(async() => {
      const data = await request.get<{data: {name: string}}>('/test')
      resolve(true);
    }, time);
  });
};

function getRoute(route: RouteOption[], path?: string) {
  return route.map((item, key) => {
    if(item.children?.length) {
      return (
        <Route key={key} path={item.path} element={item.component}>
          {getRoute(item.children, item.path)}
        </Route>
      )
    } else {
      return <Route key={key} path={(path || '') + item.path} element={item.component} />
    }
  })
}

export default () => {
  const actionRef = useRef<{
    reload: () => void;
  }>();
  const [pathname, setPathname] = useState(window.location.pathname)
  return (
      <ProLayout
        style={{
          height: '100vh',
          border: '1px solid #ddd',
        }}
        pure={pathname === '/login' ? true : false} // 删除所有layout界面,exclude content
        title="管理后台"
        actionRef={actionRef}
        location={{pathname}}
        menu={{
          request: async () => {
            await waitTime(2000);
            return customMenuDate;
          },
        }}
        headerRender={Header}
      >
        <Routes>
        {getRoute(routes)}
        </Routes>
      </ProLayout>
  );
};  