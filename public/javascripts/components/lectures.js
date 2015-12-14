import React from 'react';
import {Table, Input, Button} from 'react-bootstrap';

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
    }

    handleChange(type, index){
        if(type=="left")
            this.state.lectureLeftArray[index] = this.refs[type+index].getValue();
        else
            this.state.lectureRightArray[index] = this.refs[type+index].getValue();
        this.setState(this.state);
    }

    renderRows(){
        var rows = [];
        for(var i=0; i<7; i++){
            rows.push(
                <tr key={'lectures'+i}>
                    <td>{i+1}</td>
                    <td>
                        <Input type='text' ref={"left"+i}
                            onChange={this.handleChange.bind(this,"left",i)}
                            value={this.state.lectureLeftArray[i]} />
                    </td>
                    <td>{i+8}</td>
                    <td>
                        <Input type='text' ref={'right'+i}
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

    isMale(lecture){
        return lecture.indexOf('Who sitting in')>0;
    }

    getFemaleSitin(array){
        var result = [];
        var length = array.length;
        for(var i=5;i<length-1;i++){
            result.push(array[i]);
        }
        return result.join(', ');
    }

    getMaleDept(lecture){
        var index = lecture.indexOf(' NC ');
        return lecture.substring(0, index);
    }

    getNameIndex(lecture){
        return lecture.indexOf('1. Name:');
    }

    getVenueIndex(lecture){
        return lecture.indexOf('2. Venue:');
    }

    getTimeIndex(lecture){
        return lecture.indexOf('3. Time:');
    }

    getLectureIndex(lecture){
        return lecture.indexOf('4. What lesson:');
    }

    getSitinIndex(lecture){
        return lecture.indexOf('5. Who sitting in:');
    }

    getLecturerIndex(lecture){
        return lecture.indexOf('6. Lecturer:');
    }

    getEvangelistIndex(lecture){
        return lecture.indexOf('7. Evangelist:');
    }

    onFormat(){
        var self = this;
        var combinedArray = this.combineBothArrays();
        this.state.formattedLectures = combinedArray.map(function(item){
            if(this.isMale(item)){
                var nameIndex = this.getNameIndex(item);
                var venueIndex = this.getVenueIndex(item);
                var timeIndex = this.getTimeIndex(item);
                var lessonIndex = this.getLectureIndex(item);
                var sitinIndex = this.getSitinIndex(item);
                var lecturerIndex = this.getLecturerIndex(item);
                var evangelistIndex = this.getEvangelistIndex(item); 
                return{
                    time: item.substring(timeIndex+8, lessonIndex),
                    name: item.substring(nameIndex+9, venueIndex),
                    dept: self.getMaleDept(item),
                    lecture: item.substring(lessonIndex+15, sitinIndex),
                    lecturer: item.substring(lecturerIndex+12, evangelistIndex),
                    sitin: item.substring(sitinIndex+18, lecturerIndex)
                }

            }else{
                var array = item.split(',');
                return {
                    time: array[0],
                    name: array[1],
                    dept: array[2],
                    lecture: array[3],
                    lecturer: array[4],
                    sitin: self.getFemaleSitin(array)
                }
            }
        }.bind(this));

        this.state.table1Disp = {display: 'none'};
        this.state.table2Disp = {display: 'block'};
        this.state.table3Disp = {display: 'none'};
        this.setState(this.state);
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
                time: self.refs['time'+i].getValue(),
                name: self.refs['name'+i].getValue(),
                dept: self.refs['dept'+i].getValue(),
                lecture: self.refs['lecture'+i].getValue(),
                lecturer: self.refs['lecturer'+i].getValue(),
                sitin: self.refs['sitin'+i].getValue()
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
                                            <Input type='text' ref={'time'+index} defaultValue={lecture.time.trim()}/>
                                        </td>
                                        <td>
                                            <Input type='text' ref={'name'+index} defaultValue={lecture.name.trim()}/>
                                        </td>
                                        <td>
                                            <Input type='text' ref={'dept'+index} defaultValue={lecture.dept.trim()}/>
                                        </td>
                                        <td>
                                            <Input type='text' ref={'lecture'+index} defaultValue={lecture.lecture.trim()}/>
                                        </td>
                                        <td>
                                            <Input type='text' ref={'lecturer'+index} defaultValue={lecture.lecturer.trim()}/>
                                        </td>
                                        <td>
                                            <Input type='text' ref={'sitin'+index} defaultValue={lecture.sitin.trim()}/>
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
                            {this.state.finalLectures.map(function(lecture, index){
                                return (
                                    <tr key={'formattedLecture'+index}>
                                        <td>
                                            {index+1}
                                        </td>
                                        <td>
                                            {lecture.time}  
                                        </td>
                                        <td>
                                            {lecture.name}
                                        </td>
                                        <td>
                                            {lecture.dept}
                                        </td>
                                        <td>
                                            {lecture.lecture}
                                        </td>
                                        <td>
                                            {lecture.lecturer}
                                        </td>
                                        <td>
                                            {lecture.sitin}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div> 
        );
    }
}

export default Lectures;


function getInitState(){
    var lectureLeftArray = [];
    var lectureRightArray = [];
    for(var i=0; i<7; i++){
        lectureLeftArray.push('');
        lectureRightArray.push('');
    }
    console.log('It is initiated successfully ------test1&2&3&4!');
    return {lectureLeftArray, lectureRightArray};
}
