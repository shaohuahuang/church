// import Lectures from './javascripts/components/lectures-formatter';
// import {render} from 'react-dom';
// import React from 'react';
// // import {Router, Route, browserHistory} from 'react-router';
// import {BrowserRouter, Route} from 'react-router-dom';
//
// render(<Lectures />, document.getElementById('app'));
// //
// // render((
// // 	<BrowserRouter>
// // 		<Route path="/" component={Lectures}/>
// // 	</BrowserRouter>
// // ), document.getElementById("app"));

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/main';
import {compose, createStore, applyMiddleware} from 'redux';

import AppContainer from './components/App';

import LectureFormatter from './components/LectureFormatter';
import LectureSorter from './components/LectureSorter';
import LectureResult from './components/LectureResult';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const routes = (
	<Route>
		<Route component={AppContainer}>
			<Route path="/" component={LectureFormatter}/>
			<Route path="/sort" component={LectureSorter}/>
			<Route path="/result" component={LectureResult}/>
		</Route>
	</Route>
);

const finalCreateStore = compose(
	applyMiddleware(thunk)
)(createStore);

const store = finalCreateStore(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<div>
		<Provider store={store}>
			<Router history={history}>{routes}</Router>
		</Provider>
	</div>,
	document.getElementById('app')
);