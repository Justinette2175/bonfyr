import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import Register from './Register.jsx';
import Auth from '../auth-helper.js';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherForm : false
    }
  }

  setTeacherForm(e){
    console.log("setting teacher form")
    this.setState({teacherForm : true});
    $("#select-teach").addClass("btn-panel-active")
    $("#select-learn").removeClass("btn-panel-active")
  }

  removeTeacherForm(){
    console.log("removing teacher form")
    this.setState({teacherForm : false});
    $("#select-learn").addClass("btn-panel-active")
    $("#select-teach").removeClass("btn-panel-active")
  }

  redirectToDashboard(){
    let userId = Auth.retrieveUser().userId;
    this.props.router.push(`/dashboard/${userId}`);
  }

  render() {
    let user = Auth.retrieveUser()
    let mainContent;
    if (user && user.firstName){
      mainContent = (
        <section>
          <div className="about">
            <h2>Welcome, {user.firstName}</h2>
            <p>At teachurBuddy, we believe that everyone has something to teach, and that teaching should be fairly valued.</p>
            <p>We created a platform to allow you to teach your friends and let them pay for your time.</p>
            <p><strong>Happy learning, happy sharing!</strong></p>
            <button className="btn btn-clear" id="dashboard" onClick = {this.redirectToDashboard.bind(this)}><span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> Your Dashboard</button>
          </div>
        </section>
      )
    }
    else{
      mainContent = (
        <div>
        <div className="about">
          <h2>Teach and learn <br/> with your friends</h2>
          <p>At teachurBuddy, we believe that everyone has something to teach, and that knowledge should be fairly valued.</p>
          <p>We created a platform to allow you to teach your friends and let them pay for your time.</p>
          <p><strong>Happy learning, happy sharing!</strong></p>
        </div>
       <section className="register">
          <button type="button" id="select-learn" className="btn btn-panel btn-panel-active" onClick={this.removeTeacherForm.bind(this)}><span>I want to take classes</span></button>
          <button type="button" id="select-teach" className="btn btn-panel" onClick={this.setTeacherForm.bind(this)}><span>I want to teach</span></button>
          <Register teacherForm={this.state.teacherForm} router = {this.props.router}/>
        </section>
        </div>
      );
    }
    return (
      <div className="home">
        <NavBar router={this.props.router}/>
        <aside className="left-sidebar">
        </aside>
        <main>
          {mainContent}
        </main>
      </div>
    );
  }
}

export default HomePage;

