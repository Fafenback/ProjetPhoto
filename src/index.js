import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import { AppProvider } from './contexts/AppContext';
import { theme } from './styled/theme';

const render = (Component) => {
  ReactDOM.render(

    <AppContainer>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppProvider>
              <App />
            </AppProvider>
          </BrowserRouter>
        </ThemeProvider>
      </React.Fragment>
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
