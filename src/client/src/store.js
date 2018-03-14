import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducers from './reducers'
import thunk from 'redux-thunk';

export default createStore(reducers, applyMiddleware(logger, thunk))
