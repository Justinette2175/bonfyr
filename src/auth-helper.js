module.exports = {
  saveUser(user){
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
    }
    else{
      console.log("user could not be saved")
    }
  },
  retrieveUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
}
