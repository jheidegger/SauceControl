import React, { useState, useEffect, Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ProfilePicture from '../ProfilePicture'; 

import {withFirebase} from "../Firebase";
import { compose } from 'recompose';




const initFields = {
    name: '',
    bio: '',
    email: '',
    phone: ''
}

class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {... initFields};
    }

  
   
    handleChange = event => {
        // add validation for fields
        var {name, value} = event.target;
        this.setState({[name] : value});
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("button!");
        this.props.update(this.state);
        this.props.history.push(ROUTES.PROFILE);

        //this.props.addOrEdit(values);
    }
    

    render() {
        const {
            name,
            bio,
            email,
            phone
          } = this.props.data;

    return (
      <div>
          This is recipe creation
          {/* 
        <ProfilePicture />
        <form autoComplete="off">
          <div className="form-row">
            <h3>Public Information</h3> 
          </div>
          <div className="form-row">
            <h5>Name</h5>
            <input 
              className="form-control" 
              placeholder={this.props.data.name}
              name="name"
              defaultValue={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
          <h5>Bio</h5>
            <textarea 
              className="form-control" 
              placeholder={this.props.data.bio}
              name="bio"
              defaultValue={bio}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row">
              <h3>Private Information</h3>
          </div>
          <div className="form-row">
          <h5>Email: </h5>
          <p>{email}</p>
          </div>
          <div className="form-row">
          <h5>Phone</h5>
            <input 
              className="form-control" 
              placeholder="XXX-XXX-XXXX" 
              name="phone"
              defaultValue={phone}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-row"><Button
          type="submit" 
          value="Submit Changes"
          onClick={this.handleSubmit}>Submit Changes</Button></div>
          
        </form>
        */}
      </div>
       
    );
    
}


const EditProfileMenu = compose(
    withRouter,
)(EditProfileMenuBase);


 
export default CreateRecipe;
