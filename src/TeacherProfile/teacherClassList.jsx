import React, {Component} from 'react';
import TeacherClass from './teacherClass.jsx';
var moment = require('moment');



class TeacherClassList extends Component {

  formatDate(date){
    let array = moment(date).toArray();
    let string = moment(date).format('MMMM Do YYYY, h:mm a');
    let formatted = [];
    formatted[0] = array[0];
    formatted[2] = array[2];
    formatted[1]= moment(formatted[1]).format('MMMM');
    formatted[3]= string.substr(string.indexOf(",") + 1);
    return formatted;
  }

  render() {
    var teacherClasses = this.props.teacherClasses.map((item)=>{
      return <TeacherClass key = {item.id} avatar = {this.props.avatar} formatDate = {this.formatDate.bind(this)} teacherId = {this.props.teacherId} classTitle = {item.classTitle} classDate = {item.classDate} classDescription = {item.classDescription} classCost={item.classCost} id={item.classId} router={this.props.router} maxNumberOfStudents = {item.maxNumberOfStudents} numberOfStudents = {item.numberOfStudents} router = {this.props.router}/>
    })
    return (
      <div>
          {teacherClasses}
      </div>
    );
  }
}

export default TeacherClassList;
