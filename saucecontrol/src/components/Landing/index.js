import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
class Landing extends Component {
  
  constructor(props){
    super(props)
  }
  
  
  render(){
    return(
      <div class="container-fluid hero">
        <button type="button" class="btn hero__title" onClick={this.enter}>Enter the Sauce</button>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
    );
  }
  enter = () => {
    console.log(this.props);
    this.props.history.push(ROUTES.HOME);
  }
  
}

  

export default Landing;
