import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Header,
    Input,
    Segment,
    Button,
    Divider,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Center = styled.div`
    padding-top: 15%;
`;


const Login = (props) => <Center>
    <Grid textAlign='center'>
        <Header>
            S'identifier
    </Header>
        <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column mobile={12}>
                <Segment>
                    <Grid.Row>
                        <Input placeholder={'Prénom'} type='text' />
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Input placeholder={'Nom'} type='text' />
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Input placeholder={'Pseudo'} type='text' />
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Input placeholder={'Code'} type='text' />
                    </Grid.Row>
                </Segment>
            </Grid.Column>
            <Grid.Column></Grid.Column>
        </Grid.Row>

        <Button type='button' onClick={() => props.history.push('/news')}>Se connecter</Button>
    </Grid>
</Center>;
Login.propTypes = {};

export default Login;
