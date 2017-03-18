import React, {Component} from 'react';


class PreConference extends Component {

  rerouteToRegister(){
    let teacherId = this.props.classInfo.teacherId;
    this.props.router.push(`/teacher/${teacherId}`);
  }

  render() {
    let userId = this.props.currentUser.userId;
    console.log(this.props.classInfo);
    let students = this.props.classInfo.students;
    let teacherUserId = this.props.classInfo.teacherUserId;

    let isRegistered = false;
    if (userId === teacherUserId){isRegistered = true};
    console.log("userId", userId);
    console.log("student", students);
    for ( let i = 0; i < students.length; i++){
      if (students[i].user_id === userId){
        isRegistered = true;
      }
    }
    if (isRegistered){
      return (
        <div className="pre-conference">
          <h2>You are about to join</h2>
          <h3>{this.props.classInfo.className}</h3>
          <h4>With {this.props.classInfo.teacherFirstName} {this.props.classInfo.teacherLastName}</h4>
          <button className="btn btn-clear" id="button-join" data-class-id={this.props.classId} onClick={this.props.startConference}>Join now</button>
        </div>
      );
    }
    else {
      return (
        <div className="pre-conference">
          <h2>You are not registered for this class</h2>
          <button className="btn btn-clear" onClick={this.rerouteToRegister.bind(this)}>Register for this class</button>
        </div>
      );
    }
  }
}

export default PreConference;
