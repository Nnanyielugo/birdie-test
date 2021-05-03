import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Switch, Route } from 'react-router-dom';

import { Events, AppActions } from '@App/store/interfaces';
// import Logo from '@App/components/Logo';
import { Timeline } from '@App/components/timeline';
import { Moods } from '@App/components/moods';
import { Navigation } from '../navigation';

// const LogoUrl = require('../../assets/images/logo-birdie.svg');

interface AppProps {
  events: Events[];
  fetchEvents: () => void;
}

interface DispatchReturn {
  fetchEvents: () => void;
}

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

  componentDidMount() {
    this.props.fetchEvents();
  }

  // private initialLoadingState(): JSX.Element {
  //   return (
  //     <>
  //       <GlobalStyle />
  //       <AppContainer>
  //         <Logo src={LogoUrl} />
  //         <Title>Welcome to the birdie test</Title>
  //         <SubTitle>Best of luck!</SubTitle>
  //       </AppContainer>
  //     </>
  //   );
  // }

  public render() {
    return (
      <>
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route exact={true} path="/">
            <Timeline events={this.props.events} />
          </Route>
          <Route path="/mood-observation">
            <Moods events={this.props.events} />
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  const events = state.events.events;
  return { events };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchReturn => ({
  fetchEvents: () => dispatch({ type: AppActions.FetchEventsRequested }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
