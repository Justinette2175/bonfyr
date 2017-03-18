import React, {Component} from 'react';
import Auth from '../auth-helper.js';

class NewClass extends Component {
  constructor(props) {
    super(props);
    let teacherForm = this.props.teacherForm;
    this.state = {
      errors:{},
    }

  }


  render() {
    return(
      <div className="new-class">
        <h3>Create a new class</h3>
        <form onSubmit={this.props.addClass}>
          <label>Class Title</label>
          <input className="classTitle" name="classTitle" type= "text" onChange={this.props.changeClass} required/>
          <label>What will you be teaching?</label>
          <textarea className="classDescription" name="classDescription" type= "text" onChange={this.props.changeClass} required></textarea>
          <div className="small-group">
            <label>Price</label>
            <input className="cost" name="cost" type= "number" placeholder="$" onChange={this.props.changeClass} required/>
          </div>
          <div className="small-group">
            <label>Max students</label>
            <select className="maxNumberOfStudents" name="maxNumberOfStudents" type= "number" defaultValue="2" onChange={this.props.changeClass} required>
              <option value = "1">1</option>
              <option value = "2">2</option>
              <option value = "3">3</option>
              <option value = "4">4</option>
              <option value = "5">5</option>
              <option value = "6">6</option>
            </select>
          </div>
              <label>Date and time</label>
              <input name = "startTime" type="datetime-local" onChange={this.props.changeClass}/>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

export default NewClass;
