import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';
import routes from '../routes';
import { AppContext } from '../contexts/AppContext';
import Header from '../components/Header';

const App = (props) => {
  const { history } = props;
  const { state, dispatch } = useContext(AppContext);
  const changeName = () => dispatch({ type: 'CHANGE_NAME', payload: { name: 'Sylvain' } });
  return (
    <Container style={{ height: '100%' }}>
      <Header />
      <Switch>
        {routes.map((route) => {
          const key = uniqueId('container_');
          return <Route key={key} {...route} />;
        })}
      </Switch>

    </Container>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
