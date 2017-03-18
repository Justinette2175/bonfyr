import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Auth from '../auth-helper.js';


class TakeMoney extends Component {
    constructor(props) {
    super(props);
    let classId = this.props.classId
    this.state = {
      classId: classId,
    }
  }
  onToken(token) {
   fetch('/save-stripe-token', {
     method: 'POST',
     body: JSON.stringify(token),
   }).then(token => {
     alert("Thank you for your purchase!")
     let userId = Auth.retrieveUser().userId;
    let classRegister = {
      user_id: Auth.retrieveUser().userId,
      class_id: this.state.classId
    }
    let user = Auth.retrieveUser()
    let classes = user.classes || [];
    classes.push(this.state.classId);
    user.classes = classes;
    Auth.saveUser(user);
     $.ajax({
       url: `https://teachurbuddy4.herokuapp.com/class/${classRegister.class_id}/register`,
       type: 'POST',
       dataType: 'json',
       data: JSON.stringify(classRegister),
       headers: {
         'Content-Type':'application/json'
        },
        context: this,
       success: function(data) {
        console.log(data);
        console.log("User has registered for class");
        this.props.router.push(`/dashboard/${userId}`)
        // this.props.onHandleCount(data);
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
     })
    })
   return false;
  }

 render() {
  let dollarCost = this.props.cost * 100
  console.log(this.props.classTitle);
  let avatarUrl = `/build/assets/avatar-${this.props.avatar}.png`
   return (
     // ...
     <StripeCheckout
      name = {this.props.classTitle}
      image = {avatarUrl}
      amount = {dollarCost}
      label = "Register"
      data-classId = {this.props.id}
      token={this.onToken.bind(this)}
      stripeKey="pk_test_tzcJ5q8ABVzm88a0Ew8Tp6WS"
     />
   )
 }
}


export default TakeMoney;
