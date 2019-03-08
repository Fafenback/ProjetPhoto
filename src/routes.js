import React from 'react';
import News from './containers/News';
import Galery from './containers/Galery';
import Login from './containers/Login';
import Fade from './styled/Fade';

const routes = [
  {
    path: '/news',
    render: (props) => <Fade time={'1s'}><News {...props} /></Fade>,
    exact: true,
  },
  {
    path: '/',
    render: (props) => <Fade time={'1s'}><Login {...props} /></Fade>,
    exact: true,
  },
  {
    path: '/galery',
    render: (props) => <Fade time={'1s'}><Galery {...props} /></Fade>,
    exact: true,
  },
];

export default routes;
