import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/Store';
import './data';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line import/no-named-as-default
// import reportWebVitals from './reportWebVitals';
import Spinner from './views/spinner/Spinner';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
