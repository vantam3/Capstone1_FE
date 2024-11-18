import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalLoginProvider } from './layouts/useContext'; // 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalLoginProvider>
      <App />
    </GlobalLoginProvider>
  </React.StrictMode>
);

reportWebVitals();

