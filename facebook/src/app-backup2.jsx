import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';





class Userdetails extends React.Component {

  render () {

console.log("window FB is " + window.FB);


    return (

      <div className="userDetails">
        <p>user details</p>
        <img src={this.props.picture}></img>
          <br />
          {this.props.firstname}
          <br />
          {this.props.lastname}

      </div>



    )



  }




}




class App extends Component {

constructor(props){

  super(props);
  this.state = {loggedIn: false, picture: "./", firstname: "", lastname: ""};
  this.test = "./";
} // close constructor

componentDidMount() { // facebook SDK integration

  window.fbAsyncInit = function() {
          console.log("test");
          window.FB.init({
          appId      : '527899994260788',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.11'
          });

         window.FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

} // close component did mount

  render() {

    return (

      <div className="App">
        <div className="login">
        <h1 className="App-title">Milk Club</h1>
        {this.state.loggedIn ? <button onClick={this._fbLogout.bind(this)}> Sign Out </button> : <button onClick={this._fbLogin.bind(this)}>Login With Facebook</button>}
        <div>
        {this.state.loggedIn ? <p>Logged in</p> : <p>Please Log In</p>}
        <Userdetails firstname={this.state.firstname} lastname={this.state.lastname} picture={this.state.picture} FB={window.FB}/>
        </div>
        </div>
        </div>

    ); // close return
  } // close render


_fbLogin () { // Is user logged in? If not prompt with facebook login popup


  window.FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
           console.log('Logged in.');
           this.setState({loggedIn: true});
           this.test = true;
           console.log(this.state.loggedIn);
           console.log("this.test = " + this.test)
}
else {
  window.FB.login(function(response) {
      if (response.authResponse) {
       console.log('Fetching information.... ');
       this.setState({loggedIn: true});
       this.test = true;
       console.log("this.test = " + this.test)
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  }.bind(this));

}
}.bind(this));

this._fbGetdata() // once logged in call the method that fetches data

} // end of fb login

_fbLogout() { // logs user out of app and out of facebook - providing they are not logged into facebook or another facebook app.

  window.FB.logout(function(response) {

  });

  console.log("logged out");
  this.setState({loggedIn: false});

} // end of fb logout

_fbGetdata () { // fetches user details to display - name and picture. also gets short term token

window.FB.getLoginStatus(function(response) {

   const user = response.authResponse.userID;

      window.FB.api(user, {fields:'first_name,last_name,picture,cover,currency,devices'}, function(response) {
 console.log(response);

        this.setState({picture: response.picture.data.url, firstname: response.first_name, lastname: response.last_name });


  }.bind(this));
}.bind(this));



}// end of fb get data






} // close componenet

export default App;
