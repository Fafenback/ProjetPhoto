import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeader = styled.div`
    text-align: center;
    height: 60px;
    width: 100%;
    background: linear-gradient(to right top, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
`;

const Header = (props) => <StyledHeader>
  <div>Header</div>
</StyledHeader>;

Header.propTypes = {};

export default Header;
