import React, { useState, useEffect, useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';
import routes from '../routes';
import Header from '../components/Header';
import BottomNavbar from '../components/BottomNavbar';
import Fade from '../styled/Fade';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB, ADD_USER } from '../contexts/actions/appActions';


const StyledContainer = styled(Container)`
@media only screen and (min-width: 400px) {
  &&{
  margin: 0px !important;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right bottom, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
  ${(props) => props.isloginpage === 'false' && { background: props.theme.whitePink }}
  }
}
`;

const App = (props) => {
  const { location: { pathname } } = props;
  const { state, dispatch } = useContext(AppContext);

  const changeTab = (index) => dispatch({ type: CHANGE_TAB, payload: { tabIndex: index } });
  const addUser = (user) => dispatch({ type: ADD_USER, payload: user });

  // protect routes if no user is connected
  if (pathname !== '/' && !state.user) {
    return <Redirect to='/' />;
  }
  // skip login page if user is already connected
  if (state.user && pathname === '/') {
    return <Redirect to='/news' />;
  }
  // useEffect(() => {
  //   if (pathname === '/') {
  //     checkLoginPage('true')
  //   } else {
  //     checkLoginPage('false')
  //   }
  // }, [location.pathname])
  return (
    <React.Fragment>
      <Route path='/:path' render={(props) => <Fade><Header {...props} /></Fade>} />
      <StyledContainer>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
        <Route path='/:path' render={(props) => <Fade><BottomNavbar {...props} /></Fade>} />
      </StyledContainer>
    </React.Fragment>
  );
};
App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
