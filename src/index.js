import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';
import { ContextProvider } from './contexts/ContextProvider';
import { Provider } from 'react-redux';
import store from './store';
import 'react-toastify/dist/ReactToastify.css';

// Registering Syncfusion license key
registerLicense(process.env.REACT_APP_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      <ContextProvider>
        <App />{' '}
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
