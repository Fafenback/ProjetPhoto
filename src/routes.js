import React from 'react';
import { LoginProvider } from './contexts/LoginContext';
import News from './containers/News';
import Galery from './containers/Galery';
import Login from './containers/Login';
import Fade from './styled/Fade';
import Top from './containers/Top';

const routes = [
  {
    path: '/news',
    render: (props) => <Fade time={'1s'}><News {...props} /></Fade>,
    exact: true,
  },
  {
    path: '/',
    render: (props) => <Fade time={'1s'}><LoginProvider><Login {...props} /></LoginProvider></Fade>,
    exact: true,
  },
  {
    path: '/top',
    render: (props) => <Fade time={'1s'}><Top {...props} /></Fade>,
    exact: true,
  },
  {
    path: '/galery',
    render: (props) => <Fade time={'1s'}><Galery {...props} /></Fade>,
    exact: true,
  },
];

export default routes;
