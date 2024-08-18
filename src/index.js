import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
