import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Auth from '../auth-helper.js';
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
var stripe = window.Stripe;


class TakeMoney extends Component {

  static defaultProps = {
    className: 'StripeCheckout',
    label: 'Pay With Card',
    locale: 'auto',
    ComponentClass: 'span',
    reconfigureOnUpdate: false,
    triggerEvent: 'onClick',
  }

  static propTypes = {
    // Opens / closes the checkout modal by value
    // WARNING: does not work on mobile due to browser security restrictions
    // NOTE: Must be set to false when receiving token to prevent modal from
    //       opening automatically after closing
    desktopShowModal: React.PropTypes.bool,

    triggerEvent: React.PropTypes.oneOf([
      'onClick',
      'onTouchTap',
      'onTouchStart',
    ]),

    // If included, will render the default blue button with label text.
    // (Requires including stripe-checkout.css or adding the .styl file
    // to your pipeline)
    label: React.PropTypes.string,

    // Custom styling for default button
    style: React.PropTypes.object,
    // Custom styling for <span> tag inside default button
    textStyle: React.PropTypes.object,

    // Prevents any events from opening the popup
    // Adds the disabled prop to the button and adjusts the styling as well
    disabled: React.PropTypes.bool,

    // Named component to wrap button (eg. div)
    ComponentClass: React.PropTypes.string,

    // Show a loading indicator
    showLoadingDialog: React.PropTypes.func,
    // Hide the loading indicator
    hideLoadingDialog: React.PropTypes.func,

    // Run this method when the scrupt fails to load. Will run if the internet
    // connection is offline when attemting to load the script.
    onScriptError: React.PropTypes.func,

    // Runs when the script tag is created, but before it is added to the DOM
    onScriptTagCreated: React.PropTypes.func,

    // By default, any time the React component is updated, it will call
    // StripeCheckout.configure, which may result in additional XHR calls to the
    // stripe API.  If you know the first configuration is all you need, you
    // can set this to false.  Subsequent updates will affect the StripeCheckout.open
    // (e.g. different prices)
    reconfigureOnUpdate: React.PropTypes.bool,

    // =====================================================
    // Required by stripe
    // see Stripe docs for more info:
    //   https://stripe.com/docs/checkout#integration-custom
    // =====================================================

    // Your publishable key (test or live).
    // can't use "key" as a prop in react, so have to change the keyname
    stripeKey: React.PropTypes.string.isRequired,

    // The callback to invoke when the Checkout process is complete.
    //   function(token)
    //     token is the token object created.
    //     token.id can be used to create a charge or customer.
    //     token.email contains the email address entered by the user.
    token: React.PropTypes.func.isRequired,

    // ==========================
    // Highly Recommended Options
    // ==========================

    // Name of the company or website.
    name: React.PropTypes.string,

    // A description of the product or service being purchased.
    description: React.PropTypes.string,

    // A relative URL pointing to a square image of your brand or product. The
    // recommended minimum size is 128x128px. The recommended image types are
    // .gif, .jpeg, and .png.
    image: React.PropTypes.string,

    // The amount (in cents) that's shown to the user. Note that you will still
    // have to explicitly include it when you create a charge using the API.
    amount: React.PropTypes.number,

    // Specify auto to display Checkout in the user's preferred language, if
    // available. English will be used by default.
    //
    // https://support.stripe.com/questions/what-languages-does-stripe-checkout-support
    // for more info.
    locale: React.PropTypes.oneOf([
      'auto', // (Default) Automatically chosen by checkout
      'zh', // Chinese
      'nl', // Dutch
      'en', // English
      'fr', // French
      'de', // German
      'it', // Italian
      'jp', // Japanease
      'es', // Spanish
    ]),

    // ==============
    // Optional Props
    // ==============

    // The currency of the amount (3-letter ISO code). The default is USD.
    currency: React.PropTypes.oneOf([
      'AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD', // eslint-disable-line comma-spacing
      'BDT','BGN','BIF','BMD','BND','BOB','BRL','BSD','BWP','BZD','CAD','CDF', // eslint-disable-line comma-spacing
      'CHF','CLP','CNY','COP','CRC','CVE','CZK','DJF','DKK','DOP','DZD','EEK', // eslint-disable-line comma-spacing
      'EGP','ETB','EUR','FJD','FKP','GBP','GEL','GIP','GMD','GNF','GTQ','GYD', // eslint-disable-line comma-spacing
      'HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','ISK','JMD','JPY','KES', // eslint-disable-line comma-spacing
      'KGS','KHR','KMF','KRW','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL', // eslint-disable-line comma-spacing
      'LVL','MAD','MDL','MGA','MKD','MNT','MOP','MRO','MUR','MVR','MWK','MXN', // eslint-disable-line comma-spacing
      'MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','PAB','PEN','PGK','PHP', // eslint-disable-line comma-spacing
      'PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SEK', // eslint-disable-line comma-spacing
      'SGD','SHP','SLL','SOS','SRD','STD','SVC','SZL','THB','TJS','TOP','TRY', // eslint-disable-line comma-spacing
      'TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VND','VUV','WST','XAF', // eslint-disable-line comma-spacing
      'XCD','XOF','XPF','YER','ZAR','ZMW',                                     // eslint-disable-line comma-spacing
    ]),

    // The label of the payment button in the Checkout form (e.g. “Subscribe”,
    // “Pay {{amount}}”, etc.). If you include {{amount}}, it will be replaced
    // by the provided amount. Otherwise, the amount will be appended to the
    // end of your label.
    panelLabel: React.PropTypes.string,

    // Specify whether Checkout should validate the billing ZIP code (true or
    // false)
    zipCode: React.PropTypes.bool,

    // Specify whether Checkout should collect the user's billing address
    // (true or false). The default is false.
    billingAddress: React.PropTypes.bool,

    // Specify whether Checkout should collect the user's shipping address
    // (true or false). The default is false.
    shippingAddress: React.PropTypes.bool,

    // Specify whether Checkout should validate the billing ZIP code (true or
    // false). The default is false.
    email: React.PropTypes.string,

    // Specify whether to include the option to "Remember Me" for future
    // purchases (true or false). The default is true.
    allowRememberMe: React.PropTypes.bool,

    // Specify whether to accept Bitcoin in Checkout. The default is false.
    bitcoin: React.PropTypes.bool,

    // Specify whether to accept Alipay ('auto', true, or false). The default
    // is false.
    alipay: React.PropTypes.oneOf(['auto', true, false]),

    // Specify if you need reusable access to the customer's Alipay account
    // (true or false). The default is false.
    alipayReusable: React.PropTypes.bool,

    // function() The callback to invoke when Checkout is opened (not supported
    // in IE6 and IE7).
    opened: React.PropTypes.func,

    // function() The callback to invoke when Checkout is closed (not supported
    // in IE6 and IE7).
    closed: React.PropTypes.func,
  }


  mixins: [ ReactScriptLoaderMixin ]

  constructor(props) {
    super(props);
    let classId = this.props.classId
    this.state = {
      classId: classId,
      open: false,
      buttonActive: false,
    }
  }

  componentDidMount() {
    if (scriptLoaded) {
      return;
    }

    if (scriptLoading) {
      return;
    }

    scriptLoading = true;

    const script = document.createElement('script');
    if (typeof this.props.onScriptTagCreated === 'function') {
      this.props.onScriptTagCreated(script);
    }

    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = 1;

    this.loadPromise = (() => {
      let canceled = false;
      const promise = new Promise((resolve, reject) => {
        script.onload = () => {
          scriptLoaded = true;
          scriptLoading = false;
          resolve();
          this.onScriptLoaded();
        };
        script.onerror = (event) => {
          scriptDidError = true;
          scriptLoading = false;
          reject(event);
          this.onScriptError(event);
        };
      });
      const wrappedPromise = new Promise((accept, cancel) => {
        promise.then(() => canceled ? cancel({ isCanceled: true }) : accept()); // eslint-disable-line no-confusing-arrow
        promise.catch(error => canceled ? cancel({ isCanceled: true }) : cancel(error)); // eslint-disable-line no-confusing-arrow
      });

      return {
        promise: wrappedPromise,
        cancel() { canceled = true; },
      };
    })();

    this.loadPromise.promise
      .then(this.onScriptLoaded)
      .catch(this.onScriptError);

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (!scriptLoading) {
      this.updateStripeHandler();
    }
  }

  componentWillUnmount() {
    if (this.loadPromise) {
      this.loadPromise.cancel();
    }
    if (ReactStripeCheckout.stripeHandler && this.state.open) {
      ReactStripeCheckout.stripeHandler.close();
    }
  }

  onScriptLoaded = () => {
    if (!ReactStripeCheckout.stripeHandler) {
      ReactStripeCheckout.stripeHandler = StripeCheckout.configure({
        key: this.props.stripeKey,
      });
      if (this.hasPendingClick) {
        this.showStripeDialog();
      }
    }
  }

  onScriptError = (...args) => {
    this.hideLoadingDialog();
    if (this.props.onScriptError) {
      this.props.onScriptError.apply(this, args);
    }
  }

  onClosed = (...args) => {
    this.setState({ open: false });
    if (this.props.closed) {
      this.props.closed.apply(this, args);
    }
  }

  onOpened = (...args) => {
    this.setState({ open: true });
    if (this.props.opened) {
      this.props.opened.apply(this, args);
    }
  }

  getConfig = () => [
    'token',
    'image',
    'name',
    'description',
    'amount',
    'locale',
    'currency',
    'panelLabel',
    'zipCode',
    'shippingAddress',
    'billingAddress',
    'email',
    'allowRememberMe',
    'bitcoin',
    'alipay',
    'alipayReusable',
  ].reduce((config, key) => Object.assign({}, config, this.props.hasOwnProperty(key) && {
    [key]: this.props[key],
  }), {
    opened: this.onOpened,
    closed: this.onClosed,
  });


  handleClick() {
    let dollarCost = this.props.cost * 100
    let stripeAccountId = 1234567
    stripe.charges.create({
      amount: dollarCost,
      currency: "cad",
      source: token,
      on_behalf_of: stripeAccountId
    }).then(function(charge) {
      console.log(charge);
    });


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
      onClick={this.handleClick.bind(this)}
     />
   )
 }
}


export default TakeMoney;
