class authentification {

  registerUser(username, password, email, firstName, lastName){
    let userInfo = {
      password : password,
      email : email,
      username : username,
      firstName : firstName,
      lastName : lastName
    }
    $.ajax({
      url: this.dataServer + "/users/new",
      type: 'POST',
      data: {userInfo},
      success: function(data) {
        this.postLogin(data);
        //set the state with the newly loaded data so the display will update
      //   this.setState({currentUser: data.currentUser, classesTaking: data.classesTaking, classesGiving : data.classesGiving});
      // }.bind(this),
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

}

export default authentification

// function login(username, password){
//   doLoginThings(username, password);
//   if (functionToCallAfterLoggingIn !== undefined){
//     functionToCallAtfterLogginIn(username);
//   }
// }
