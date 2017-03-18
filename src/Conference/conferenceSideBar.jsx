import React, {Component} from 'react';
import RegisteredStudents from './registeredStudents.jsx';


class ConferenceSideBar extends Component {

  render() {
    return (
      <aside className="left-sidebar">
        <h2>{this.props.classInfo.className}</h2>
        <h3>With {this.props.classInfo.teacherFirstName} {this.props.classInfo.teacherLastName}</h3>
        <h4>Registered Students</h4>
        <RegisteredStudents students={this.props.classInfo.students}/>
      </aside>
    );
  }
}

export default ConferenceSideBar;
