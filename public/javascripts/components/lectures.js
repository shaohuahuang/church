import React from 'react';
import {Table, Input, Button} from 'react-bootstrap';

class Lectures extends React.Component {
    constructor(){
        super();
        this.state = getInitState();
        this.renderRows = this.renderRows.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    render(){
        return(
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
    return {lectureLeftArray, lectureRightArray};
}
