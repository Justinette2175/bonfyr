import React, {Component} from 'react';
import Auth from '../auth-helper.js';
import BecomeTeacherForm from './becomeTeacherForm.jsx';


class BecomeTeacher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      becomeTeacherBtn:false,
      teacher : {
        description: "",
      }
    }
  }

  showBecomeTeacherForm(e){
    let button = e.target;
    if (this.state.becomeTeacherBtn){
      this.setState({becomeTeacherBtn:false})
    }
    else{
      this.setState({becomeTeacherBtn:true})
    }
  }

  render() {
    let teacherForm;
    if (this.state.becomeTeacherBtn) teacherForm = <BecomeTeacherForm becomeTeacher = {this.props.becomeTeacher} handleChange = {this.props.handleChange}/>
    return (
      <div className="become-teacher">
        <button className = "btn" onClick={this.showBecomeTeacherForm.bind(this)}><span className="glyphicon glyphicon-cog" aria-hidden="true"></span>Start Teaching Classes</button>
        {teacherForm}
      </div>
    );
  }
}

export default BecomeTeacher;
