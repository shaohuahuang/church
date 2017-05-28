import React from 'react';
import LectureFormatter from './LectureFormatter';
import LectureSorter from './LectureSorter';
import LectureResult from './LectureResult';

class App extends React.Component{
	constructor(){
		super();
	}
	render() {
		return (
			<div>
				<LectureFormatter/>
				<LectureSorter/>
				<LectureResult/>
			</div>
		)
	}
};

export default App;