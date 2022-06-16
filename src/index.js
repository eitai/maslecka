import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

import './index.css';
import './styles/css-reset.scss';
import './styles/global-variables.scss';
import './styles/global.scss';
const container = document.getElementById('root');
const root = createRoot(container);
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {' '}
      <Provider store={store}>
        <CacheProvider value={cacheRtl}>
          <App />
        </CacheProvider>{' '}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
