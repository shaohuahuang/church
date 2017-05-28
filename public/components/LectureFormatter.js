import React from 'react';
import ReactDOM from 'react-dom';
import {Table, FormControl, Button} from 'react-bootstrap';
import {push} from 'react-router-redux';
import {getConnectedComponent} from '../util/redux-connect';

class Lectures extends React.Component {
    constructor(){
        super();
        this.state = getInitState();
        this.state.formattedLectures = [];
        this.state.finalLectures = [];
        this.state.table1Disp = {display: 'block'};
        this.state.table2Disp = {display: 'none'};
        this.state.table3Disp = {display: 'none'};
        this.renderRows = this.renderRows.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormat = this.onFormat.bind(this);
        this.onSort = this.onSort.bind(this);
        this.capitalize = this.capitalize.bind(this);
    }

    handleChange(type, index){
        if(type=="left")
            this.state.lectureLeftArray[index] = ReactDOM.findDOMNode(this.refs[type+index]).value;
        else
            this.state.lectureRightArray[index] = ReactDOM.findDOMNode(this.refs[type+index]).value;
        this.setState(this.state);
    }

    renderRows(){
        var rows = [];
        for(var i=0; i<7; i++){
            rows.push(
                <tr key={'lectures'+i}>
                    <td>{i+1}</td>
                    <td>
                        <FormControl type='text' ref={"left"+i}
                            onChange={this.handleChange.bind(this,"left",i)}
                            value={this.state.lectureLeftArray[i]} />
                    </td>
                    <td>{i+8}</td>
                    <td>
                        <FormControl type='text' ref={'right'+i}
                            onChange={this.handleChange.bind(this,"right",i)}
                            value={this.state.lectureRightArray[i]} />
                    </td>
                </tr>
            );
        }
        return rows;
    }

    combineBothArrays(){
        var result = [];
        this.state.lectureLeftArray.forEach(function(item){
            if(item)
                result.push(item);
        });
        this.state.lectureRightArray.forEach(function(item){
            if(item)
                result.push(item);
        });
        return result;
    }

    getFemaleSitin(array){
        var result = [];
        var length = array.length;
        for(var i=5;i<length-1;i++){
            result.push(array[i]);
        }
        return result.join(', ');
    }
  
    onFormat(){
        // var self = this;
        // var combinedArray = this.combineBothArrays();
        // this.state.formattedLectures = combinedArray.map(function(item){
        //     var array = item.split(',');
        //     return {
        //         time: array[0],
        //         name: array[1],
        //         dept: array[2],
        //         lecture: array[3],
        //         lecturer: array[4],
        //         sitin: self.getFemaleSitin(array),
        //         isMale: false
        //     }
        // }.bind(this));
        // this.state.table1Disp = {display: 'none'};
        // this.state.table2Disp = {display: 'block'};
        // this.state.table3Disp = {display: 'none'};
        // this.setState(this.state);
        this.props.push('/sort');
        
    } 

    onSort(){
        this.state.table1Disp = {display: 'none'};
        this.state.table2Disp = {display: 'none'};
        this.state.table3Disp = {display: 'block'};
        this.state.finalLectures = this.getFinalLecturesArray();
        this.setState(this.state);
    }

    getFinalLecturesArray(){ 
        var result = [];
        var length = this.state.formattedLectures.length;
        var self = this;
        for(var i=0; i<length; i++){
            result.push({
              time: ReactDOM.findDOMNode(this.refs['time'+i]).value,
	            name: ReactDOM.findDOMNode(this.refs['name'+i]).value,
	            dept: ReactDOM.findDOMNode(this.refs['dept'+i]).value,
	            lecture: ReactDOM.findDOMNode(this.refs['lecture'+i]).value,
	            lecturer: ReactDOM.findDOMNode(this.refs['lecturer'+i]).value,
	            sitin: ReactDOM.findDOMNode(this.refs['sitin'+i]).value
            });
        };
        result.sort(function(a, b){
            return self.compareTime(a.time, b.time);
        });
        return result;
    }

    isMorning(time){
        return time.indexOf('am') > 0;
    }

    compareTime(time1, time2){
        if(this.isMorning(time1)&&!this.isMorning(time2))
            return -1
        if(!this.isMorning(time1)&&this.isMorning(time2))
            return 1
        var time1_hour, time1_min, time2_hour, time2_min;

        if(time1.indexOf(':')==-1){
            time1_hour = time1.substring(0, time1.length-2);
            time1_min = 0;
        }else{
            var array = time1.split(':');
            time1_hour = array[0]; 
            time1_min = array[1].substring(0,array[1].length-2);
        }

        if(time2.indexOf(':')==-1){
            time2_hour = time2.substring(0, time2.length-2);
            time2_min = 0;
        }else{
            var array = time2.split(':');
            time2_hour = array[0]; 
            time2_min = array[1].substring(0,array[1].length-2);
        }

        time1_hour = parseFloat(time1_hour);
        time2_hour = parseFloat(time2_hour);
        time1_min = parseFloat(time1_min);
        time2_min = parseFloat(time2_min);

        if(time1_hour==12&&time2_hour==12)
            return time1_min - time2_min;
        if(time1_hour==12)
            return -1;
        if(time2_hour == 12)
            return 1;
        if(time1_hour<time2_hour)
            return -1
        else if(time1_hour == time2_hour)
            return time1_min - time2_min;
        else
            return 1;
    }

    capitalize(str){
        var array = str.split(' ');
        var result = array.map(capitalizeFirstLetter);
        return result.join(' ');
    }

    render(){
        return(
            <div>
                <div style={this.state.table1Disp}>
                  <Table>
                      <thead>
                        <tr>
                            <th>Index</th>
                            <th>Lecture</th>
                            <th>Index</th>
                            <th>Lecture</th>
                        </tr>
                      </thead>
                      <tbody>
                          {this.renderRows()}
                      </tbody>
                  </Table>
                  <Button onClick={this.onFormat}>Format</Button>
                </div>

                <div style={this.state.table2Disp}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Dept</th>
                                <th>Lecture</th>
                                <th>Lecturer</th>
                                <th>Sit-In</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.formattedLectures.map(function(lecture, index){
                                return (
                                    <tr key={'formattedLecture'+index}>
                                        <td>
                                            {index+1}
                                        </td>
                                        <td>
                                            <FormControl type='text' ref={'time'+index} defaultValue={lecture.time.trim()}/>
                                        </td>
                                        <td>
                                            <FormControl type='text' ref={'name'+index} defaultValue={lecture.name.trim()}/>
                                        </td>
                                        <td>
                                            <FormControl type='text' ref={'dept'+index} defaultValue={lecture.dept.trim()}/>
                                        </td>
                                        <td>
                                            <FormControl type='text' ref={'lecture'+index} defaultValue={lecture.lecture.trim()}/>
                                        </td>
                                        <td>
                                            <FormControl type='text' ref={'lecturer'+index} defaultValue={lecture.lecturer.trim()}/>
                                        </td>
                                        <td>
                                            <FormControl type='text' ref={'sitin'+index} defaultValue={lecture.sitin.trim()}/>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Button onClick={this.onSort}>Sort</Button>
                </div>

                <div style={this.state.table3Disp}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Dept</th>
                                <th>Lecture</th>
                                <th>Lecturer</th>
                                <th>Sit-In</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.finalLectures.map(function(lecture, index){
                                return (
                                    <tr key={'formattedLecture'+index}>
                                        <td>
                                            <p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{lecture.time}</p>
                                        </td>
                                        <td>
                                            <p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{this.capitalize(lecture.name)}</p>
                                        </td>
                                        <td>
                                            <p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{this.capitalize(lecture.dept)}</p>
                                        </td>
                                        <td>
                                            <p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{this.capitalize(lecture.lecture)}</p>
                                        </td>
                                        <td>
                                            <p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{this.capitalize(lecture.lecturer)}</p>
                                        </td>
                                        <td>
                                            <p style={{fontSize: '18px', fontFamily:'arial rounded mt bold'}}>{this.capitalize(lecture.sitin)}</p>
                                        </td>
                                    </tr>
                                );
                            }.bind(this))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default getConnectedComponent(Lectures, [{push}], (state)=>{
	return {}
});


function getInitState(){
    var lectureLeftArray = [];
    var lectureRightArray = [];
    for(var i=0; i<7; i++){
        lectureLeftArray.push('');
        lectureRightArray.push('');
    } 
    return {lectureLeftArray, lectureRightArray};
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}