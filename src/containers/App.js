import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../contexts/AppContext';

const StyledButton = styled.button`
  width: 50px;
  height: 30px;
  color: blue;
  background: yellow;
`;

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const changeName = () => dispatch({ type: 'CHANGE_NAME', payload: { name: 'Sylvain' } });
  return (
    <div>
      <h1>{state.name}</h1>
      <StyledButton onClick={changeName}>changeName</StyledButton>
    </div>
  );
};

export default App;
