import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ConferenceSideBar from './conferenceSideBar.jsx';
import Twilio from './twilio.jsx';

class ConferenceMain extends Component {

  componentDidMount() {
    console.log("mounting conference");
    let classId = this.props.classId;
    let userId = this.props.currentUser.userId;
    console.log(userId);
    Twilio.startTwilio(classId, userId);
  }

  render(){
    let teacherMedia = $('#teacher-media');
    let noTeacher;
    return(
      <div className="conference">
        <NavBar router={this.props.router}/>
        <ConferenceSideBar classInfo = {this.props.classInfo}/>
        <main>
          <div id="teacher-media">
            {noTeacher}
          </div>
          <div id="student-media"></div>
        </main>
      </div>
    )
  }
}


export default ConferenceMain;
