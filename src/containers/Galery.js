import React, { useEffect, useContext } from 'react';
import { Image } from 'semantic-ui-react';
import { AppContext } from '../contexts/AppContext';
import { CHANGE_TAB } from '../contexts/actions/appActions';
import Photo from '../components/Photo';

const Galery = (props) => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    dispatch({ type: CHANGE_TAB, payload: { tabIndex: 3 } });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <Image.Group size="small">
        {[1, 2, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map((elt) => (
          <Photo src="./test.png" />
        ))}
      </Image.Group>
    </div>
  );
};

Galery.propTypes = {};

export default Galery;
