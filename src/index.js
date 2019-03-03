import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./containers/App', () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require('./containers/App'));
  });
}
