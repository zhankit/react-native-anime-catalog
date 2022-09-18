import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {useDispatch} from 'react-redux';
import rootReducer from './mainReducer';
import rootSaga from './mainSaga';
import {Middleware} from '@reduxjs/toolkit';

// Middleware: Redux Saga
const middlewares: Middleware[] = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (__DEV__) {
	const createDebugger = require('redux-flipper').default;
	middlewares.push(createDebugger());
}

// Redux: Store
const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
