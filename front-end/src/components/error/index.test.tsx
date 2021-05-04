import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ErrorComponent } from './';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '@App/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <ErrorComponent />
      </Provider>
    </Router>,
    div
  );
});
