import React from 'react';
import SearchField from "react-search-field";
import { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../constants/saucecontrol1.png'
import * as ROUTES from '../../constants/routes';
import Auth2 from '../Auth2';
import {Auth2Context} from '../Auth2';
import { withFirebase } from '../Firebase';

class Navigation extends Component {
  constructor(props) {
    super(props)
  }
  search = (value,event) => {
    console.log(this.props);
    this.props.history.push("/search/"+value);
  }
  render(){
    return(<div>
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
      <Link class="nav-link" to={ROUTES.CREATE_RECIPE}>New Recipe</Link>
      </li>
      <li class="nav-item">
      <SignInButton firebase={this.props.firebase}/>
      </li>
     
    </ul>
    <SearchField
            placeholder="Search..."
            onChange={this.change}
            onEnter={this.search}
            onSearchClick={this.search}
            classNames="test-class"
            />
  </div>
</nav>
  </div>);}
}
class SignInButton extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    //var auth = new Auth2();
    //console.log(auth);
    
    window.gapi.load('auth2', () => {
        this.auth2 = window.gapi.auth2.init({
        client_id: "680067494074-6prk74r4md0u4emgb4k5i2803t6i8pjf"
    }).then(() => {
      console.log(this.auth2.isSignedIn)
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
    this.registerUser(profile);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = user.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    console.log(user);
    sessionStorage.setItem("userData", JSON.stringify(user.getBasicProfile()));
  }
  onFailure = () => {
    console.log('Failure');
  }
  registerUser = (profile) => {
    // check if profile already exists
    console.log("this is working");
    console.log(this.props);
    this.props.firebase.checkUser(profile.getEmail());
  }
  render = () => (
    <div id="my-signIn" />
    )
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
export default withFirebase(Navigation);
