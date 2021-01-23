import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {user:null};
  }
  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    let user=data;
    console.log(user);
    this.setState({user: user});
  }
  getFirstName() {
    if(this.state.user !==null) {
      return this.state.user.bT;
    }
    else {
      return "no name";
    }
  }
  getLastName() {
    if(this.state.user !==null) {
      return this.state.user.dR;
    }
    else {
      return "no name";
    }
  }
  getEmail() {
    if(this.state.user !==null) {
      return this.state.user.jt;
    }
    else {
      return "no Email";
    }
  }
  getProfileImageLink() {
    if(this.state.user !==null) {
      return this.state.user.fI;
    }
    else {
      return "no Email";
    }
  }
  render(){

    return(
  <div class="container-fluid">
    <div class="row"><h1 class="s-4 animate__animated animate__fadeInLeft">Hello {this.getFirstName()}</h1></div>
  </div>);
  }
}

export default Home;
