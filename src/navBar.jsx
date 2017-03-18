import React, {Component} from 'react';
import Auth from './auth-helper.js';
import { default as Router, Route } from 'react-router'
import { Navigation } from 'react-router'


class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state =  {
      user : {
        email: "",
        password: "",
        username: "",
        firstName : "",
        lastName : ""
      }
    };
  }



  componentDidMount() {
    this.setUser();
  }

  redirectHome(){
    this.props.router.push('/');
  }


  loginUser(e){
   let logInUser = {
    email : this.state.user.email,
    password : this.state.user.password
   }
   e.preventDefault();
   $.ajax({
     url: "https://teachurbuddy4.herokuapp.com/login",
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(logInUser),
     headers: {
       'Content-Type':'application/json'
      },
      context: this,
     success: function(data) {
       console.log("data", data);
       Auth.saveUser(data);
       this.setUser();
       this.props.router.push(`/dashboard/${Auth.retrieveUser().userId}`)
     },
     error: function(xhr, status, err) {
          console.error(err.toString());
          console.log(xhr)
          alert(xhr.responseText)
          // alert(xhr.responseText)
     }.bind(this)
   })
  return false; //returning false to prevent info showing in url
 }

  setUser(){
    console.log("SettingUser");
    let currentUser = Auth.retrieveUser() || {};
    console.log(currentUser.username);
    let userToSet = {email: currentUser.email, username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName, id:currentUser.id, teacherId : currentUser.teacherId}
    this.setState({user : userToSet});
    // if (currentUser.username !== "") {
    //   console.log(this.props.router);
    //   this.props.router.push(`/dashboard/${Auth.retrieveUser().userId}`)
    // }
  }

  logout(e){
    let noUser = {
        email: "",
        password: "",
        username: "",
        firstName : "",
        lastName : ""
      };
      Auth.saveUser(noUser);
      this.setState({user : noUser});
      this.props.router.push('/');
    }



  changeUser(e){
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({user : user}, ()=>{
    })
  }

  redirectToDashboard(){
    let userId = Auth.retrieveUser().userId;
    this.props.router.push(`/dashboard/${userId}`);
  }

  render() {
    let navContent;
    let user = Auth.retrieveUser()
    if (user && user.firstName) {
    return (
         <nav>
           <h1><a onClick={this.redirectHome.bind(this)}>teach<span>ur</span>Buddy</a></h1>
           <div id="login-input">
             <span className = "logged-in-as">Logged in as <strong>{this.state.user.firstName} {this.state.user.lastName}</strong></span>
             <button type="submit" id="logout" className="btn btn-clear" onClick = {this.logout.bind(this)}>Logout</button>
             <button className="btn btn-clear" id="dashboard" onClick = {this.redirectToDashboard.bind(this)}><span className="glyphicon glyphicon-user" aria-hidden="true"></span> My Dashboard</button>
           </div>
         </nav>
       );
     } else {
       return (
         <nav>
           <h1><a onClick={this.redirectHome.bind(this)}>teach<span>ur</span>Buddy</a></h1>
           <div id="login-input">
             <form className="loginUser" onSubmit={this.loginUser.bind(this)}>
               <input id="email" name ="email" placeholder="you@email.com" value={this.state.email} type="email" onChange={this.changeUser.bind(this)}/>
               <input id="password" name="password" placeholder="password" type="password" value={this.state.email} onChange={this.changeUser.bind(this)}/>
               <button type="submit" className="btn btn-clear" id="login">Login</button>
             </form>
           </div>
         </nav>
       );
    }
  }
}




export default NavBar;
