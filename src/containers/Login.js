import React, { useContext } from 'react';
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
import axios from 'axios';
import { LoginContext } from '../contexts/LoginContext';
import {
  ADD_CODE,
  ADD_FIRSTNAME,
  ADD_LASTNAME,
  ADD_PSEUDO,
  ADD_LOGIN_ERROR,
} from '../contexts/actions/loginActions';
import { AppContext } from '../contexts/AppContext';
import { ADD_USER } from '../contexts/actions/appActions';
import UploadFile from '../components/UploadFile';

const Center = styled.div`
@media only screen and (min-width: 850px) {
  &&{
    padding-top: 10%;
  }
}
    padding-top: 30%;

`;

const Login = (props) => {
  const { history } = props;
  const {
    state: {
      firstname, lastname, code, pseudo,
    }, dispatch,
  } = useContext(LoginContext);

  const appContext = useContext(AppContext);

  const changeLastname = (e) => dispatch({ type: ADD_LASTNAME, payload: { lastname: e.target.value } });
  const changeFirstname = (e) => dispatch({ type: ADD_FIRSTNAME, payload: { firstname: e.target.value } });
  const changeCode = (e) => dispatch({ type: ADD_CODE, payload: { code: e.target.value } });
  const changePseudo = (e) => dispatch({ type: ADD_PSEUDO, payload: { pseudo: e.target.value } });
  const handleError = (error) => dispatch({
    type: ADD_LOGIN_ERROR,
    payload: {
      error,
    },
  });

  const postUser = () => axios.post('/auth', {
    firstname, lastname, code, pseudo,
  }).then((res) => appContext.dispatch({ type: ADD_USER, payload: { user: res.data } })).then(() => history.push('/news')).catch((error) => handleError(error));

  return <Center>
    <Grid textAlign='center'>
      <Header>
        S'identifier
      </Header>
      <UploadFile/>
      <Grid.Row>
        <Grid.Column></Grid.Column>
        <Grid.Column mobile={12} computer={4}>
          <Segment>
            <Divider hidden />
            <Grid.Row>
              <Input placeholder={'Prénom'} type='text' onChange={changeFirstname} value={firstname} />
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <Input placeholder={'Nom'} type='text' onChange={changeLastname} value={lastname} />
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <Input placeholder={'Pseudo'} type='text' onChange={changePseudo} value={pseudo} />
            </Grid.Row>
            <Divider hidden />
            <Grid.Row>
              <Input placeholder={'Code'} type='text' onChange={changeCode} value={code} />
            </Grid.Row>
            <Divider hidden />
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid.Row>
      <Button type='button' onClick={postUser}>Se connecter</Button>
    </Grid>
  </Center>;
};
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Login;
