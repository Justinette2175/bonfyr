import React, {Component} from 'react';
const uuidV4 = require('uuid/v4');
var moment = require('moment');


class GivingClass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let students = this.props.students;
    if (students[0] === "null null"){ students = []}
    let studentNumber = students.length;
    let studentsMarkup = students.map((student)=>{
      let id = uuidV4();
      return <li key = {id}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>{student}</li>
    })
    return (
      <article className = "class giving-class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
          <p><strong>{studentNumber} students registered</strong></p>
          <ul>
            {studentsMarkup}
          </ul>
        </div>
        <div className="class-date">
          <span className="year">{this.props.formatDate(this.props.classDate)[0]}</span>
          <span className="month">{this.props.formatDate(this.props.classDate)[1]}</span>
          <span className="day">{this.props.formatDate(this.props.classDate)[2]}</span>
          <span className="time">{this.props.formatDate(this.props.classDate)[3]}</span>
        </div>
        <div className="class-delete" onClick={this.props.deleteClass} data-class-id={this.props.classId}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </div>
      </article>
    );
  }
}

export default GivingClass;
