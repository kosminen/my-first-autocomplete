import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './styles/reset.css';
import './styles/global.scss';
import './styles/forms.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
