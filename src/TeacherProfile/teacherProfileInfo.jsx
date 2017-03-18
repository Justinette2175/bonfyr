import React, {Component} from 'react';
import Auth from "../auth-helper.js";


class TeacherProfileInfo extends Component {


  render() {
    let editingForm;
    let edit = this.props.edit;
    let avatar = this.props.teacher.avatar;
    let backgroundImage = `url(/build/assets/avatar-${avatar}.png)`
    let avatarContainer = <div className="avatar" style={{"background-image" : backgroundImage}}></div>

    if (this.props.teacher.id == Auth.retrieveUser().teacherId){
      let form = <p>{this.props.teacher.description}</p>
      if (edit){
        form = (
          <div>
            <label htmlFor="description">Tell us a bit about yourself and what you will be teaching *</label>
            <textarea name="description" onChange={this.props.handleChange}>{this.props.teacher.description}</textarea>
            <input type="submit" value="Save edits" className="btn btn-default"/>
          </div>
        )
        let avatarOptions = [];
        for(let i = 1; i<= 9; i++){
          avatarOptions.push(<li className="avatar-option" key={i} value = {i} style={{"background-image" : `url(/build/assets/avatar-${i}.png`}} onClick={this.props.selectAvatar}></li>)
        }
        avatarContainer = (
          <div className="avatar">
            <ul>
              {avatarOptions}
            </ul>
          </div>
        )
      }
      editingForm = (
        <div className="edit">
          <form className="edit-description" onSubmit={this.props.saveChanges}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.props.editProfile}></span>
            {form}
          </form>
        </div>
      );
    }
    else{
      editingForm = <p>{this.props.teacher.description}</p>
    }
    return (
      <aside className="left-sidebar">
        <div className="container-sidebar">
          {avatarContainer}
          <h2>{this.props.teacher.firstName} {this.props.teacher.lastName}</h2>
          {editingForm}
        </div>
      </aside>
    );
  }
}

export default TeacherProfileInfo;





