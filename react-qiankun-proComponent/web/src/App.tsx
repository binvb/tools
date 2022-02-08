import React, { useRef } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import customMenuDate from './customMenu';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import routes from './routes'
import Header from './components/common/header'
function waitTime(time = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

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
        title="管理后台模板"
        actionRef={actionRef}
        menu={{
          request: async () => {
            await waitTime(2000);
            return customMenuDate;
          },
        }}
        location={{
          pathname: '/welcome',
        }}
        headerRender={Header}
      >
        <Routes>
            {
              routes.map((item, key) => {
                return <Route key={key} path={item.path} element={item.component} />
              })
            }
        </Routes>
      </ProLayout>
  );
};  