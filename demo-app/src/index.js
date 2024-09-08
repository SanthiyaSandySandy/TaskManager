
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google'
import {Provider} from 'react-redux'
import {store} from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='900378498254-snk01igj6i4dggd9th06babr89tf9s5s.apps.googleusercontent.com'>
    <Provider store={store}>
      <App/> 
      </Provider> 
      </GoogleOAuthProvider>
  </React.StrictMode>
);
