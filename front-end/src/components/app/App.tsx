import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Events from '@App/components/events';
import Moods from '@App/components/moods';
import { Navigation } from '@App/components/navigation';
import { Error404 } from '@App/components/error404';

interface AppProps {}

interface AppState {}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    background-color: #456990;
    > div {
      height: 100%;
    }
  }
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route exact={true} path="/">
            <Events />
          </Route>
          <Route path="/mood-observation">
            <Moods />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
