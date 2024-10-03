import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router/Index';
// import 'antd/dist/antd.css';

function App() {
  return (<RouterProvider router={routerConfig} />);
}

export default App;
