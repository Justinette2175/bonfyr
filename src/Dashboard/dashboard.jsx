import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ClassList from './classList.jsx';
import NewClass from './newClass.jsx';
import Auth from '../auth-helper.js';
import BecomeTeacher from './becomeTeacher.jsx';
var moment = require('moment');



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.dataServer = "https://teachurbuddy4.herokuapp.com";
    let today = this.getTodaysDate();
    this.state = {
      currentUser: {},
      teacher:{
        description:""
      },
      classesTaking: [],
      classesGiving:[],
      dailyQuote : {
        quote : "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author:"Ghandi"
      },
      newClass:{
        classTitle:"",
        classDescription:"",
        startTime:today,
        cost:"",
        maxNumberOfStudents: 2,
      },
      creatingClass: false,
      today:today
    };
    this.getClassesTaking();
    this.getClassesGiving();

  }

  componentDidMount() {
    console.log("FIRE");
    this.generateRandomQuote();
  }

  generateRandomQuote(){
    let quotes =
    [
      {
        quote : "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author:"Ghandi"
      },
      {
        quote : "Education is the most powerful weapon which you can use to change the world.",
        author : "Nelson Mandela"
      },
      {
        quote : "Tell me and I forget, teach me and I may remember, involve me and I learn." ,
        author : "Benjamin Franklin"
      },
      {
        quote : "The only way for a woman, as for a man, to find herself, to know herself as a person, is by creative work of her own. There is no other way.",
        author : "Betty Friedan"
      },
      {
        quote : "Without courage we cannot practice any other virtue with consistency.",
        author : "Maya Angelou"
      }
    ]
    let number = Math.floor(Math.random() * 5)  ;
    let quote = quotes[number]
    this.setState({dailyQuote : quote});
  }



  getClassesTaking() {
   let classesTaking = this.state.classesTaking;
   let userId = this.props.params.id;
   let authUserId = Auth.retrieveUser().userId
   $.ajax({
     url: `https://teachurbuddy4.herokuapp.com/dashboard/${userId}/taking`,
     type: 'GET',
     context: this,
     success: function(data) {
      console.log("return", data)
       this.setClassesTaking(data)
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

 getClassesGiving() {
   let classesGiving = this.state.classesGiving;
   let userId = this.props.params.id;
   $.ajax({
     url: `https://teachurbuddy4.herokuapp.com/dashboard/${userId}/giving`,
     type: 'GET',
     context: this,
     success: function(data) {
       // let user = JSON.parse(data);
       this.setClassesGiving(data)
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

  setClassesGiving(data) {
    this.setState({classesGiving: data}, ()=>{
    })
  }


  setClassesTaking(data) {
    this.setState({classesTaking: data})
  }

  redirectHome(){
    this.props.router.push('/');
  }

  setSpinner(status) {
    this.setState({creatingClass: status})
  }

  becomeTeacher(e){
    e.preventDefault();
    let userId = this.props.params.id;
    console.log("description", this.state.teacher.description)
    let teacher = {
      description : this.state.teacher.description
    }
    $.ajax({
       url: `https://teachurbuddy4.herokuapp.com/users/${userId}/becometeacher`,
       type: 'POST',
       context: this,
       dataType: 'json',
       data: JSON.stringify(teacher),
        headers: {
           'Content-Type':'application/json'
          },
       success: function(data) {
          let currentUser = Auth.retrieveUser();
          currentUser.teacherId = data.teacherId;
          Auth.saveUser(currentUser);
          this.setState({currentUser : currentUser})
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    })
    return false; //returning false to prevent info showing in url
  }

  changeTeacher(e){
    const field = e.target.name;
    const teacher = this.state.teacher;
    teacher[field] = e.target.value;
    this.setState({teacher:teacher})
  }

  clearInputs(e){
    e.target.classTitle.value = "";
    e.target.classDescription.value = "";
    e.target.cost.value = "";
    e.target.maxNumberOfStudents.value = "";
    e.target.startTime.value = "";
  }

  getTodaysDate(){
    var today = moment().format('YYYY-MM-DDThh:mm');
    return today
  }

  changeClass(e){
    const field = e.target.name;
    const newClass = this.state.newClass;
    newClass[field] = e.target.value;
    this.setState({newClass}, ()=>{
      console.log(this.state.newClass)
    })
  }

  addClassToState(classInfo){
    this.getClassesGiving();
  }


  addClass(e){
    let newClass = this.state.newClass;
    e.preventDefault();
    let userId = Auth.retrieveUser().userId;
    this.clearInputs(e);
    this.setSpinner(true);
    $.ajax({
       url: `https://teachurbuddy4.herokuapp.com/dashboard/${userId}/class/new`,
       type: 'POST',
       dataType: 'json',
       data: JSON.stringify(newClass),
       headers: {
         'Content-Type':'application/json'
        },
        context: this,
       success: function() {
        this.addClassToState();
        this.setSpinner(false)
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    })
    return false; //returning false to prevent info showing in url
  }

  deleteClass(e) {
    let button = e.target;
    let classId = {classId : $(e.target).attr("data-class-id")}
    let classesGiving = this.state.classesGiving;
    for (let i = 0; i < classesGiving.length; i++){
      if (classesGiving[i].classId === classId.classId){
        classesGiving.splice(i, 1);
      }
    }
    this.setState({classesGiving: classesGiving}, ()=>{
      console.log(classId);
    console.log("Class id", classId)
      $.ajax({
         url: "https://teachurbuddy4.herokuapp.com/class/delete",
         type: 'POST',
         dataType: 'json',
         data: JSON.stringify(classId),
         headers: {
           'Content-Type':'application/json'
          },
          context: this,
         success: function() {
          console.log("class deleted")
         },
         error: function(xhr, status, err) {
           console.error(err.toString());
         }.bind(this)
       })
     return false; //returning false to prevent info showing in url
    })
  }


  render() {
    let userId = Auth.retrieveUser().userId;
    if (userId == this.props.params.id) {
      let newClassForm;
      let teacherLink;
      let becomeTeacherOption;
      if (Auth.retrieveUser().teacherId){
        teacherLink = (
          <div className="teacher-link">
            <h3>View and edit your profile</h3>
              <div className="fb-share-button"
                data-href={`https://teachurbuddy4.herokuapp.com/teacher/${Auth.retrieveUser().teacherId}`}
                data-layout="button">
              </div>
            <p><a href = {`http://localhost:3000/teacher/${Auth.retrieveUser().teacherId}`}>{`http://localhost:3000/teacher/${Auth.retrieveUser().teacherId}`}</a></p>
          </div>
        )
        newClassForm = <NewClass changeClass = {this.changeClass.bind(this)} addClass = {this.addClass.bind(this)} getClassesGiving = {this.getClassesGiving.bind(this)} setClassesGiving = {this.setClassesGiving.bind(this)} today = {this.state.today}/>
      }
      else {
        becomeTeacherOption = <BecomeTeacher userId = {userId} becomeTeacher = {this.becomeTeacher.bind(this)} handleChange = {this.changeTeacher.bind(this)}/>
      }
      let spinner;
      if (this.state.creatingClass) {
        spinner = <div>Im spinning</div>;
      }
      return (
        <div className="dashboard">
          <NavBar router={this.props.router}/>
          <main>
            <div className="container-main">
              <section className = "quote">
                <p>{this.state.dailyQuote.quote}</p>
                <p>- {this.state.dailyQuote.author}</p>
              </section>
              {becomeTeacherOption}
              <h2>Dashboard</h2>
              <ClassList deleteClass = {this.deleteClass.bind(this)} classesTaking = {this.state.classesTaking} classesGiving = {this.state.classesGiving}/>
            </div>
          </main>
          <aside className="left-sidebar">
            {teacherLink}
            {newClassForm}
          </aside>
        </div>
      );
    }
    else{
      return(
        <div className = "wrong-dashboard">
          <NavBar router={this.props.router}/>
          <div>
            <h1>You do not have access to this page it seems</h1>
            <button className="btn btn-default" onClick={this.redirectHome.bind(this)}>Return to home page</button>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
