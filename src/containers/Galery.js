import React, { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB } from '../contexts/actions/appActions';
import { Image } from 'semantic-ui-react';

const Galery = (props) => {
    const { dispatch } = useContext(AppContext);
    useEffect(() => {
        dispatch({ type: CHANGE_TAB, payload: { tabIndex: 3 } })
    }, []);

    return <div>Galery

        {/* <div><Image.Group size='small'>
            <Image src={''} />
            <Image src={''} />
            <Image src={''} />
            <Image src={''} />
        </Image.Group></div> */}
    </div>
};

Galery.propTypes = {};

export default Galery;
