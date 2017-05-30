import React from 'react';
import {getConnectedComponent} from '../util/redux-connect';
import {Table, FormControl, Button} from 'react-bootstrap';
import util from '../util/util';
import {push} from 'react-router-redux';
import * as actions from '../actions/action_creators';

class LectureResult extends React.Component{
	constructor(){
		super();
		this.renderLecturesPerGender = this.renderLecturesPerGender.bind(this);
	}
	
	renderLecturesPerGender(lectures, isMale){
		let deptNames = Object.keys(lectures);
		let gender = isMale?"male" : "female";
		return deptNames.map(function (deptName) {
			let deptLectures = lectures[deptName];
			return (
				<div>
					<p>Dept Name : {deptName}</p>
					<Table>
						<thead>
						<tr>
							<th>Time</th>
							<th>Name</th>
							<th>Lecture</th>
							<th>Lecturer</th>
							<th>Sit-In</th>
						</tr>
						</thead>
						<tbody>
						{deptLectures.map(function(lecture, index){
							return (
								<tr key={'formattedLecture'+index}>
									<td>
										<p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{lecture[0]}</p>
									</td>
									<td>
										<p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{util.capitalize(lecture[1])}</p>
									</td>
									<td>
										<p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{util.capitalize(lecture[2])}</p>
									</td>
									<td>
										<p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{util.capitalize(lecture[3])}</p>
									</td>
									<td>
										<p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{util.capitalize(lecture[4])}</p>
									</td>
								</tr>
							);
						})}
						</tbody>
					</Table>
				</div>
			)
		})
	}
	
	render(){
		return(
			<div style={{marginLeft: "5%", marginRight:"5%"}}>
				<div>
					<p style={{fontSize:"16px",fontWeight:"bold",color:"red"}}>Female Lectures</p>
					{this.renderLecturesPerGender(this.props.femaleLectures, false)}
				</div>
				<div>
					<p style={{fontSize:"16px",fontWeight:"bold",color:"#3399ff"}}>Male Lectures</p>
					{this.renderLecturesPerGender(this.props.maleLectures, true)}
				</div>
			</div>
		)
	}
}

export default getConnectedComponent(LectureResult,[actions, {push}], state=>{
	return state.lecture.toJS()
});