import {fromJS} from 'immutable';

const initialState = fromJS({
	maleLectures: {},
	femaleLectures: {}
});

export default function reduce(state=initialState, action) {
	switch (action.type){
	
	}
	return state;
}