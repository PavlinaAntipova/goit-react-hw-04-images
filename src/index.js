import App from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/goit-react-hw-04-images/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

