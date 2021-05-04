import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@App/components/app/App';
import store from '@App/store';

const app = (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(app, root);
registerServiceWorker();
