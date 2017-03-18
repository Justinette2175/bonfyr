import React, {Component} from 'react';
import PreConference from './pre-conference.jsx';
import ConferenceMain from './conferenceMain.jsx';
import Auth from '../auth-helper.js';




class Conference extends Component {
  constructor(props) {
    super(props);
    let classId = this.props.params.classId;
    let currentUser = this.props.currentUser;
    this.state = {
      startConference : false,
      classId : classId,
      classInfo : {},
      currentUser : currentUser
    }

  }

  componentWillMount() {
    this.getConferenceData();
  }

  startConference(){
    console.log("conference started")
    this.setState({startConference : true})
  }

  getConferenceData(){
    let classId = this.state.classId;
    $.ajax({
      url: `https://teachurbuddy4.herokuapp.com/class/${classId}`,
      type: 'GET',
      context: this,
      async:false,
      success: function(data) {
        let classInfo = data.classInfo;
        console.log("classInfo", classInfo);
        this.setState({classInfo})
      },
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   })
   return false; //returning false to prevent info showing in url
  }

  render() {
    if (this.state.startConference){
      return (
        <ConferenceMain className="container" router={this.props.router} classId = {this.state.classId} currentUser = {this.state.currentUser} classInfo = {this.state.classInfo}/>
      );
    }
    else {
      console.log(this.state.classInfo);
      if (this.state.classInfo){
        return (<PreConference className="container" router={this.props.router} startConference={this.startConference.bind(this)} currentUser = {this.state.currentUser} classInfo = {this.state.classInfo} classId = {this.state.classId}/>)
      }
    }
  }
}

export default Conference;
