import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { api } from './API/constants';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="skelantros-test.eu.auth0.com"
      clientId="IQ0mXkRlbsXkI11UBgnHZt2kR2TzM9tH"
      redirectUri={window.location.origin}
      audience={api}
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
