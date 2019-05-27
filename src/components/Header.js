import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const StyledHeader = styled.div`
  text-align: center;
  height: 60px;
  width: 100%;
  background: linear-gradient(to right top, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
`;

const Header = (props) => (
  <StyledHeader>
    <Image src={'headerWhite.png'} />
  </StyledHeader>
);

Header.propTypes = {};

export default Header;
