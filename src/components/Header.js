import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import header from '../../assets/images/header.png';

const StyledHeader = styled.div`
    margin-right: 20px;
    height: 60px;
    width: 100%;
    background: linear-gradient(to right top, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 150%);
`;

const Header = (props) => <StyledHeader>
    <div>Header</div>
</StyledHeader>;

Header.propTypes = {};

export default Header;
