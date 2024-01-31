import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import rootSaga from './store/sagas';
import rootReducer from './store/reducers';

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
    devTools: process.env.NEXT_PUBLIC_NODE_ENV === 'developer',
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export default store;
