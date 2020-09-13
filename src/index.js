import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import App from './components/App';
import reducers from './reducers';
import middleware from './middleware';

import './index.css';

const theme = {
  link: {
    grey: '#afafaf',
    blue: '#55BAF2',
  },
  backgroundColor: '#f4f4f4',
  cloudColor: '#fafafa',
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    padding: 0;
    margin: 0;
    height: 100%
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.2rem;
    padding: inherit;
    margin: inherit;
    font-family: sans-serif;
    height: 100%;
    background-color: ${(props) => props.theme.backgroundColor};

  }
  a {
    text-decoration: none;
  }

  .div-cloud {
    background-color: ${(props) => props.theme.cloudColor};
    padding: 1rem;
  }
`;

// redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(middleware));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
