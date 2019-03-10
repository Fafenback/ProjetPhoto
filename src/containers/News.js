import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB } from '../contexts/actions/appActions';

const News = (props) => {
  const { location } = props;
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: CHANGE_TAB, payload: { tabIndex: 1 } });
  }, [location.pathname]);

  return <div>News</div>;
};

News.propTypes = {};

export default News;
