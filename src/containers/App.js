import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 50px;
    height: 30px;
    color: blue;
    background: yellow;
`;

const App = () => {
  const [count, add] = useState(0);

  return <div>
    <h1>{count}</h1>
    <StyledButton onClick={() => add(count + 1)}>ADD</StyledButton>
  </div>;
};

export default App;∏
