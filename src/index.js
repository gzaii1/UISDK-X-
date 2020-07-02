import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@store';
import { render } from 'react-dom';
import 'antd/dist/antd.css'


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
