import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import header from '../../assets/images/header.png';

const StyledHeader = styled.div`
    position: fixed;
    height: 100px;
    max-height: 100px;
    width: 100%;
`;

const Header = (props) => <StyledHeader>
    Header
</StyledHeader>;

Header.propTypes = {};

export default Header;