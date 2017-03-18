import React, {Component} from 'react';
import TakeMoney from './stripe.jsx';
var moment = require('moment');
import Auth from '../auth-helper.js';

class TeacherClass extends Component {


  render() {
    console.log("DDDDDDDDDDDD", this)
    let userClasses = Auth.retrieveUser().classes;
    let user = Auth.retrieveUser().userId;
    let teacher = Auth.retrieveUser().teacherId
    let registered = null;
    if (user && userClasses && userClasses.includes(this.props.id)) {
      registered = <p>You are registered</p>
    } else if (user && this.props.maxNumberOfStudents <= this.props.numberOfStudents){
      registered = <p>Class is full</p>
    } else if (this.props.teacherId == teacher) {
      registered = <p></p>
    } else if (!user){
      registered = <p>Login to register</p>
    }else {
      registered = <TakeMoney avatar = {this.props.avatar} onHandleCount={this.handleCount} maxNumberOfStudents ={this.props.maxNumberOfStudents} cost = {this.props.classCost} classId = {this.props.id} classTitle = {this.props.classTitle} router={this.props.router} teacherId = {this.props.teacherId} />
    }
    return (
      <article className = "class clearfix teacher-profile-class">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <p>{this.props.classDescription}</p>
        </div>
        <div className="class-date">
          <span className="year">{this.props.formatDate(this.props.classDate)[0]}</span>
          <span className="month">{this.props.formatDate(this.props.classDate)[1]}</span>
          <span className="day">{this.props.formatDate(this.props.classDate)[2]}</span>
          <span className="time">{this.props.formatDate(this.props.classDate)[3]}</span>
        </div>
        <div>
          <span className="cost">$ {this.props.classCost}</span>
          <div className="register">
            {registered}
          </div>
        </div>
      </article>
    );
  }
}

export default TeacherClass;



