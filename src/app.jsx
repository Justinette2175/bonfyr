import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import HomePage from './Home/home.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import StripeCheckout from 'react-stripe-checkout';
import authentification from './authentification-tools.jsx';
import Auth from './auth-helper.js';

class App extends Component {
    constructor(props) {
    super(props);
  }



  render() {
    let currentUser = Auth.retrieveUser() || {};
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        currentUser : currentUser
     }))
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}



export default App;
