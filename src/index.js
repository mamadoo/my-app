import React from 'react';
import ReactDOM from 'react-dom';

import { ProvideAuth } from "./components/useAuth";
import App from './App';
import './index.css';

ReactDOM.render(
  <ProvideAuth>
    <App />,
  </ProvideAuth>,
  document.getElementById('root'),
);
