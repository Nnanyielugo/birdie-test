import * as React from 'react';
import { /*styled, */ createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Events, AppActions } from '@App/store/interfaces';
// import Title from '@App/components/Title';
// import Logo from '@App/components/Logo';
// import SubTitle from '@App/components/SubTitle';
import { Timeline } from './timeline';

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
    ::before {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

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
        <Timeline events={this.props.events} />
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
