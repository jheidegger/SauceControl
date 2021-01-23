import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';

const SignIn = () => (
  <div>
    <h1>SignIn</h1>
    <SignInDisplay />
  </div>
);

class SignInDisplay extends Component {
  componentDidMount() {
    window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
        client_id: "680067494074-6prk74r4md0u4emgb4k5i2803t6i8pjf"
    }).then(() => {
        window.gapi.signin2.render('my-signIn', {
          'scope': 'profile email',
          'width': 250,
          'height': 50,
          'longtitle': false,
          'theme': 'dark',
          'onsuccess': this.onSuccess,
          'onfailure': this.onFailure
        })
      }) 
    })    
  }
  onSuccess = (user) => {
    var profile = user.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = user.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
  onFailure = () => {
    console.log('Failure');
  }
  render = () => (<div id="my-signIn" />)
}

export default withRouter(SignIn);
export { SignInDisplay};
