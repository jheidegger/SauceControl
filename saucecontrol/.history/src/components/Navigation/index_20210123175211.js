import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../constants/saucecontrol1.png'
import * as ROUTES from '../../constants/routes';


const Navigation = () => (
  <div>
    <NavigationBar />
    
  </div>
);
const NavigationBar = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="Home">
      <img src={logo} alt="logo"  height="60"/>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link class="nav-link" to={ROUTES.HOME}>Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.LANDING}>LandingPage</Link>
      </li>
      <li class="nav-item">
      <SignInButton/>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.CREATE_RECIPE}>New Recipe</Link>
      </li>
     
    </ul>
  </div>
</nav>
  
);
class SignInButton extends Component {
  componentDidMount() {
    window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
        client_id: "680067494074-6prk74r4md0u4emgb4k5i2803t6i8pjf"
    }).then(() => {
        window.gapi.signin2.render('my-signIn', {
          'scope': 'profile email',
          'width': 120,
          'height': 40,
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
const NavigationNonAuth = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="Home">Mayfly</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav">
    <li class="navbar-item">
      <Link class="nav-link" to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li class="navbar-item">
      <Link class="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
  </div>
  </nav>
);
export default Navigation;
