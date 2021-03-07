// store.js
import {createStore} from 'redux';
import {applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducers';

const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(createLogger)),
  );
};

const store = configureStore();

export default store;
