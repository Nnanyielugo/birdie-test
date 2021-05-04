import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Paginator from './';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '@App/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <Paginator
          totalItems={20}
          limit={5}
          loaded={false}
          pageNeighbors={2}
          onPageChanged={(props) => {}}
          skip={5}
        />
      </Provider>
    </Router>,
    div
  );
});
