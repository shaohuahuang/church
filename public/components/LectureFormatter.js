import React from 'react';
import ReactDOM from 'react-dom';
import {Table, FormControl, Button} from 'react-bootstrap';
import {push} from 'react-router-redux';
import {getConnectedComponent} from '../util/redux-connect';
import util from '../util/util';

class LectureFormatter extends React.Component {
	constructor(){
		super()
	}
	
	render(){
		return(
			<div>
				<div className="textareaContainer">
					<div style={{width: "45%", float:"left", marginLeft:"25px"}}>
						<p>Female Lectures</p>
						<FormControl componentClass="textarea"/>
					</div>
					<div style={{width: "45%", float:"right", marginRight:"25px"}}>
						<p>Male Lectures</p>
						<FormControl componentClass="textarea"/>
					</div>
				</div>
				<Button style={{marginTop: "25px", marginLeft:"25px"}}>Format</Button>
			</div>
		)
	}
}

export default LectureFormatter;

