import React from 'react';
import News from './containers/News';
import Galery from './containers/Galery';

const routes = [
  {
    path: '/news',
    render: (props) => <News {...props} />,
  },
  {
    path: '/galery',
    render: (props) => <Galery {...props} />,
  },
];

export default routes;
