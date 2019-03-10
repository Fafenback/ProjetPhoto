import React, { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB } from '../contexts/actions/appActions';

const Galery = (props) => {
  const { location } = props;
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: CHANGE_TAB, payload: { tabIndex: 3 } });
  }, [location.pathname]);

  return <div>Galery</div>;
};

Galery.propTypes = {};

export default Galery;
