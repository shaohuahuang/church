import {combineReducers} from 'redux';
import lecture from './lecture';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const RootReducer = combineReducers({
	lecture,
	routing: routerReducer
});

export default RootReducer