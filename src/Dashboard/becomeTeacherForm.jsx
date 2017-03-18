import React, {Component} from 'react';


class BecomeTeacherForm extends Component {

  render() {
    return (
      <form className="become-teacher-form" onSubmit={this.props.becomeTeacher}>
        <h3>Register as a teacher</h3>
        <label htmlFor="description">Tell us a bit about yourself and what you will be teaching *</label>
        <textarea name="description" onChange={this.props.handleChange}></textarea>
        <input type="submit" value="Create my teacher profile" className="btn btn-default submit"/>
      </form>
    );
  }
}

export default BecomeTeacherForm;
