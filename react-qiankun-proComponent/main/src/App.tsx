import React, { useRef } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import customMenuDate from './customMenu';
import {
  Routes,
  Route,
  useParams
} from "react-router-dom";
import routes, { RouteOption } from './routes'
import Header from './components/common/header'


function waitTime(time = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

function getRoute(route: RouteOption[]) {
  return route.map((item, key) => {
    if(item.children?.length) {
      return (
        <Route key={key} path={item.path} element={item.component}>
          {getRoute(item.children)}
        </Route>
      )
    } else {
      return <Route key={key} path={item.path} element={item.component} />
    }
  })
  // if(route.children) {
  //   return (
  //     <Route key={key} path={route.path} element={route.component}>
  //         {getRoute()}
  //     </Route>
  //   )
  // } else {
  //   return <Route key={key} path={route.path} element={route.component} />
  // }
}

export default () => {
  const actionRef = useRef<{
    reload: () => void;
  }>();
  return (
      <ProLayout
        style={{
          height: '100vh',
          border: '1px solid #ddd',
        }}
        // pure={true} // 删除所有layout界面,exclude content
        title="管理后台模板"
        actionRef={actionRef}
        menu={{
          request: async () => {
            await waitTime(2000);
            return customMenuDate;
          },
        }}
        headerRender={Header}
      >
        <Routes>
          {
            getRoute(routes)
          }
        </Routes>
      </ProLayout>
  );
};  