import React, { useContext } from 'react';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';

import routes from '../routes';
import { AppContext } from '../contexts/AppContext';

const StyledButton = styled.button`
  width: 50px;
  height: 30px;
  color: blue;
  background: yellow;
`;

const App = (props) => {
  const { history } = props;
  const { state, dispatch } = useContext(AppContext);
  const changeName = () => dispatch({ type: 'CHANGE_NAME', payload: { name: 'Sylvain' } });
  return (
    <div>
      <h1>{state.name}</h1>
      <StyledButton onClick={changeName}>changeName</StyledButton>
      <button onClick={() => history.push('/news')}>News</button>
      <button onClick={() => history.push('/galery')}>Galery</button>
      {routes.map((route) => {
        const key = uniqueId('container_');
        return <Route key={key} {...route} />;
      })}
    </div>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default withRouter(App);
