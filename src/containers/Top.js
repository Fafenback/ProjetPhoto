import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB } from '../contexts/actions/appActions';

const Top = (props) => {
    const { location } = props;
    const { dispatch } = useContext(AppContext);

    useEffect(() => {
        dispatch({ type: CHANGE_TAB, payload: { tabIndex: 2 } })
    }, [location.pathname]);

    return <div>Top</div>
};

Top.propTypes = {};

export default Top;
