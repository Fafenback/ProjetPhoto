import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import { AppContext } from '../contexts/AppContext';

const BottomNavbarContainer = styled.div`
    position: fixed;
    bottom: 0;  
    width: 100%;
`;

const NavbarHomeButton = styled(Button)`
&&&{
    color: ${(props) => props.tabIndex === 1 ? props.theme.lightGray : props.theme.whitePink};
    background: linear-gradient(210deg, ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 100%);
}
`;
const NavbarTopButton = styled(Button)`
&&&{
    color: ${(props) => props.tabIndex === 2 ? props.theme.lightGray : props.theme.whitePink};
    background: linear-gradient( to bottom , ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 200%);
}
`;
const NavbarGaleryButton = styled(Button)`
&&&{
    color: ${(props) => props.tabIndex === 3 ? props.theme.lightGray : props.theme.whitePink};
    background: linear-gradient(140deg , ${(props) => props.theme.primary}, ${(props) => props.theme.secondary} 80%);
}
`;
export const BottomNavbar = (props) => {
    const { history: { push } } = props;
    const { state } = useContext(AppContext);

    return <BottomNavbarContainer>
        <Button.Group widths='3'>
            <NavbarHomeButton size='massive' tabIndex={state.tabIndex} onClick={() => push('/news')} icon={<Icon name='home' size='large' />} />
            <NavbarTopButton size='massive' tabIndex={state.tabIndex} onClick={() => push('/top')} icon={<Icon name='heart' size='large' />} />
            <NavbarGaleryButton size='massive' tabIndex={state.tabIndex} onClick={() => push('/galery')} icon={<Icon name='th large' size='large' />} />
        </Button.Group>
    </BottomNavbarContainer>

};

BottomNavbar.propTypes = {
}

export default BottomNavbar;