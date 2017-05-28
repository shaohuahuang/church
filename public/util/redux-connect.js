import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export function getConnectedComponent(componnet, actions, stateSelector){
	function mapStateToProps(state) {
		return stateSelector(state);
	}
	
	function mapDispatchToProps(dispatch){
		let combinedActions = {};
		actions.forEach(function(action){
			Object.assign(combinedActions, action);
		});
		return bindActionCreators(combinedActions, dispatch);
	}
	
	return connect(mapStateToProps, mapDispatchToProps)(componnet);
}