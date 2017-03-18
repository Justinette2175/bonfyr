import React, {Component} from 'react';


class TakingClass extends Component {

  render() {

    return (
      <article className = "class taking-class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <h5>{this.props.teacherName}</h5>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
        </div>
        <div className="class-date">
          <span className="year">{this.props.formatDate(this.props.classDate)[0]}</span>
          <span className="month">{this.props.formatDate(this.props.classDate)[1]}</span>
          <span className="day">{this.props.formatDate(this.props.classDate)[2]}</span>
          <span className="time">{this.props.formatDate(this.props.classDate)[3]}</span>
        </div>
      </article>
    );
  }
}

export default TakingClass;
