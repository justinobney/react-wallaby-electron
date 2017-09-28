import './app.global.css';

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Root from './Root';

import createStore, {history} from './store';

const store = createStore();
const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root');
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootEl,
    );
  });
}
