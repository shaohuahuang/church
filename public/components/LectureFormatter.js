import React from 'react';
import {Table, FormControl, Button} from 'react-bootstrap';
import {push} from 'react-router-redux';
import {getConnectedComponent} from '../util/redux-connect';
import util from '../util/util';
import * as actions from '../actions/action_creators';

class LectureFormatter extends React.Component {
	constructor(){
		super();
		this.parse = this.parse.bind(this);
	}
	
	parse(){
		let rawFemaleData = util.getDomVal(this.refs.female);
		let rawMaleData = util.getDomVal(this.refs.male);
		this.props.collateLectures(util.parse(rawMaleData),util.parse(rawFemaleData));
		this.props.push('/sort');
	}
	
	render(){
		return(
			<div>
				<div className="textareaContainer">
					<div style={{width: "48%", float:"left", marginLeft:"25px"}}>
						<p>Female Lectures</p>
						<FormControl componentClass="textarea" ref="female"/>
					</div>
					<div style={{width: "48%", float:"right", marginRight:"25px"}}>
						<p>Male Lectures</p>
						<FormControl componentClass="textarea" ref="male"/>
					</div>
				</div>
				<Button onClick={this.parse} style={{marginTop: "25px", marginLeft:"25px"}}>Format</Button>
			</div>
		)
	}
}

export default getConnectedComponent(LectureFormatter, [actions,{push}], (state) => {
	return {
	
	}
});

