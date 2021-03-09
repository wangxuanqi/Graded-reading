// store.js
import {createStore} from 'redux';
import {applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger();
const configureStore = (preloadedState) => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk,
        //loggerMiddleware
      ),
    ),
  );
};

const store = configureStore();

export default store;
