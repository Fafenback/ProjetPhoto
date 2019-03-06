import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Header, Input, Segment, Button,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Test = styled.div`
    padding-top: 30%;
`;

const Login = (props) => <Test>
  <Grid centered verticalAlign='middle'>
    <Grid.Column textAlign='center'>
      <Header>
                S'identifier
      </Header>
      <Grid.Column>
        <Segment>
          <Grid.Row>
            <Input placeholder={'Prénom'} type='text' />
          </Grid.Row>
          <Grid.Row>
            <Input placeholder={'Nom'} type='text' />
          </Grid.Row>
          <Grid.Row>
            <Input placeholder={'Pseudo'} type='text' />
          </Grid.Row>
          <Grid.Row>
            <Input placeholder={'Code'} type='text' />
          </Grid.Row>
        </Segment>
      </Grid.Column>
      <Button type='button' onClick={() => props.history.push('/news')}>Se connecter</Button>
    </Grid.Column>
  </Grid></Test>;
Login.propTypes = {};

export default Login;
