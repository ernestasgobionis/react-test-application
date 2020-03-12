import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import RootSaga from './redux/sagas/root-saga';
import combineReducers from './redux/reducers';
import App from './app';

function configureStore(initialState: object) {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const middleware = [sagaMiddleware, logger];
  return {
    ...createStore(
      combineReducers,
      initialState,
      compose(applyMiddleware(...middleware)),
    ),
    runSaga: sagaMiddleware.run,
  };
}

export const store = configureStore({});
store.runSaga(RootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
