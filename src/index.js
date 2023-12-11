import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.render(
  <GoogleOAuthProvider
    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
)
