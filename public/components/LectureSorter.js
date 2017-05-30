import React from 'react';
import {getConnectedComponent} from '../util/redux-connect';
import {Table, FormControl, Button} from 'react-bootstrap';
import util from '../util/util';
import {push} from 'react-router-redux';
import * as actions from '../actions/action_creators';

class LectureSorter extends React.Component{
	constructor(){
		super();
		this.renderLecturesPerGender = this.renderLecturesPerGender.bind(this);
		this.onSort = this.onSort.bind(this);
		this.getModifiedLectures = this.getModifiedLectures.bind(this);
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
							<th>Index</th>
							<th>Time</th>
							<th>Name</th>
							<th>Lecture</th>
							<th>Lecturer</th>
							<th>Sit-In</th>
						</tr>
						</thead>
						<tbody>
						{/*lecture format: time, name, lesson, lecturers, sit-ins..., venue*/}
						{deptLectures.map(function(lecture, index){
							return (
								<tr key={'formattedLecture'+index}>
									<td>
										{index+1}
									</td>
									<td>
										<FormControl type='text' ref={gender+deptName+'time'+index} defaultValue={lecture[0]}/>
									</td>
									<td>
										<FormControl type='text' ref={gender+deptName+'name'+index} defaultValue={lecture[1]}/>
									</td>
									<td>
										<FormControl type='text' ref={gender+deptName+'lecture'+index} defaultValue={lecture[2]}/>
									</td>
									<td>
										<FormControl type='text' ref={gender+deptName+'lecturer'+index} defaultValue={lecture[3]}/>
									</td>
									<td>
										<FormControl type='text' ref={gender+deptName+'sitin'+index} defaultValue={util.getSitins(lecture)}/>
									</td>
								</tr>
							);
						})}
						</tbody>
					</Table>
				</div>
			)
		}.bind(this))
	}
	
	getModifiedLectures(isMale){
		let self = this;
		let gender = isMale?"male": "female";
		let lectures = isMale? this.props.maleLectures: this.props.femaleLectures;
		let deptNames = Object.keys(lectures);
		let modifiedLectures = deptNames.reduce(function (memo, deptName) {
			let deptLectures = lectures[deptName];
			let modifiedDeptLectures = []
			for(let i=0; i<deptLectures.length; i++){
				let time = util.getDomVal(self.refs[gender+deptName+"time"+i]);
				let name = util.getDomVal(self.refs[gender+deptName+"name"+i]);
				let lecture = util.getDomVal(self.refs[gender+deptName+"lecture"+i]);
				let lecturer = util.getDomVal(self.refs[gender+deptName+"lecturer"+i]);
				let sitin = util.getDomVal(self.refs[gender+deptName+"sitin"+i]);
				modifiedDeptLectures.push([time,name,lecture,lecturer,sitin]);
			}
			modifiedDeptLectures.sort(function (lecture1, lecture2) {
				return util.compareTime(lecture1[0], lecture2[0]);
			});
			memo[deptName] = modifiedDeptLectures;
			return memo;
		},{});
		return modifiedLectures;
	}
	
	onSort(){
		var maleLectures = this.getModifiedLectures(true);
		var femaleLectures = this.getModifiedLectures(false);
		this.props.collateLectures(maleLectures, femaleLectures);
		this.props.push('/result');
	}
	
	render(){
		return(
			<div style={{marginLeft: "5%", marginRight:"5%"}}>
				<div style={{border: "1px solid red", padding: "20px",borderRadius: "12px"}}>
					<p style={{fontSize:"16px",fontWeight:"bold",color:"red"}}>Female Lectures</p>
					{this.renderLecturesPerGender(this.props.femaleLectures, false)}
				</div>
				<hr />
				<div style={{border: "1px solid #3399ff", padding: "20px",borderRadius: "12px"}}>
					<p style={{fontSize:"16px",fontWeight:"bold",color:"#3399ff"}}>Male Lectures</p>
					{this.renderLecturesPerGender(this.props.maleLectures, true)}
				</div>
				<Button onClick={this.onSort}>Sort</Button>
			</div>
		)
	}
}

export default getConnectedComponent(LectureSorter,[actions, {push}], state=>{
	return state.lecture.toJS()
});