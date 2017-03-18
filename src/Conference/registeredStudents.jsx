import React, {Component} from 'react';


class RegisteredStudents extends Component {

  render() {
    let students = this.props.students;
    console.log(students);
    let studentsList = students.map((student)=>{
      return <li id={student.username}><div className="student-connection-status"></div>{student.first_name} {student.last_name}</li>
    });
    return (
        <ul>
          {studentsList}
        </ul>
    );
  }
}

export default RegisteredStudents;
