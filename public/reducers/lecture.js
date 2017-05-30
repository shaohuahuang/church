import {fromJS} from 'immutable';
import {actions} from '../actions/action_creators';

let initialState = fromJS({
	maleLectures: {},
	femaleLectures: {}
});

export default function reduce(state=initialState, action) {
	switch (action.type){
		case actions.COLLATE_LECTURES:
			return state.clear().merge(action.data);
	}
	return state;
}