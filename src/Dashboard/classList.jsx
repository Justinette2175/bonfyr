import React, {Component} from 'react';
import TakingClass from './takingClass.jsx';
import GivingClass from './givingClass.jsx';
var moment = require('moment');



class ClassList extends Component {

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
    let classesTaking;
    let classesGiving;
    let givingMessage;
    let takingMessage;
    let noClassesMessage;
    if (this.props.classesTaking.length != 0){
        takingMessage = <h3>Classes you are registered for</h3>
        classesTaking = this.props.classesTaking.map((item)=>{
        return <TakingClass key = {item.classId} classId = {item.classId} classTitle = {item.classTitle} teacherName = {item.teacherName} classDate = {item.classDate} classLink = {item.classLink} formatDate = {this.formatDate.bind(this)}/>
      })
    }
    if (this.props.classesGiving.length != 0){
      givingMessage = (
        <div>
          <h3>Classes you are teaching</h3>
          <p className="small-notice">Share the link to your profile to let friends register to your classes!</p>
        </div>
        )
      classesGiving = this.props.classesGiving.map((item)=>{
        return <GivingClass deleteClass = {this.props.deleteClass} key = {item.classId} classId = {item.classId} classTitle = {item.classTitle} classDate = {item.classDate} classLink = {item.classLink} students = {item.students} formatDate = {this.formatDate.bind(this)}/>
      })
    }
    if ((this.props.classesGiving.length === 0) && (this.props.classesTaking.length === 0)) {
      noClassesMessage = <div className="popup"><p>You are not registered for any class</p></div>
      }


    return (
      <div>
          {givingMessage}
          {classesGiving}
          {takingMessage}
          {classesTaking}
          {noClassesMessage}
      </div>
    );
  }
}

export default ClassList;
