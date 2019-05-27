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
// assets
import '../assets/images/headerColored.png';
import '../assets/images/headerWhite.png';
import '../assets/images/test.png';
import PhotoUpload from '../components/PhotoUpload';

const PhotoUploadContainer = styled.div`
  position: absolute;
  bottom: 17%;
  right: 5%;
  .uploadButton {
    padding-top: 15px;
    margin-left: 17px;
  }
  .miniature {
    margin-bottom: 20px;
    margin-right: 10px;
    height: 100px;
    width: 100px;
    border: solid 1px black;
    border-radius: 20px;
    i {
      margin-top: 17px;
      margin-left: 17px;
    }
  }
`;
const StyledContainer = styled.div`
  @media only screen and (min-width: 400px) {
    && {
      margin: 0px;
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow: auto;
      background: linear-gradient(to right bottom, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
      ${(props) => props.isloginpage === 'false' && { background: props.theme.whitePink }}
    }
  }
`;

const App = (props) => {
  const {
    location: { pathname },
  } = props;
  const { state, dispatch } = useContext(AppContext);

  const changeTab = (index) => dispatch({ type: CHANGE_TAB, payload: { tabIndex: index } });
  const addUser = (user) => dispatch({ type: ADD_USER, payload: user });

  // protect routes if no user is connected
  if (pathname !== '/' && !state.user) {
    return <Redirect to="/" />;
  }
  // skip login page if user is already connected
  if (state.user && pathname === '/') {
    return <Redirect to="/news" />;
  }
  return (
    <React.Fragment>
      <Route
        path="/:path"
        render={(props) => (
          <Fade>
            <Header {...props} />
          </Fade>
        )}
      />
      <StyledContainer>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </StyledContainer>
      <PhotoUploadContainer>
        <PhotoUpload />
      </PhotoUploadContainer>

      <Route
        path="/:path"
        render={(props) => (
          <Fade>
            <BottomNavbar {...props} />
          </Fade>
        )}
      />
    </React.Fragment>
  );
};
App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
