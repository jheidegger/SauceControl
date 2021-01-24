import React, { Component} from 'react';
import { withFirebase } from '../Firebase';
import {Row,Col,Card,Button,Image} from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { Link, withRouter, Route } from 'react-router-dom';
import logo from '../../constants/saucecontrol1.png'

const INITIAL_STATE = {
    title: '',
    summary: '',
    img: '../../constants/saucecontrol1.png',
    time: '',

};
class PreviewCard extends Component {
    constructor(props){
        super(props);
        this.state = INITIAL_STATE
    }
    onResult = (querySnapshot) => {
        console.log(querySnapshot.data())
        this.setState({summary:querySnapshot.data().summary,
                        title:querySnapshot.data().title,
                        img:querySnapshot.data().photoURL});
        // add the cover image and time fields to this later
    } 
    onError  = () => {
        console.log("ahhhhh")
    }
    componentDidMount = () => {
        this.props.firebase.db.collection('recipes')
        .doc(this.props.id).onSnapshot(this.onResult, this.onError)
    }

    render() {
        var img = logo;
        console.log(this.state.img);
        if(this.state.img !== undefined){
            img = this.state.img;
        }
        return (
        <div class="card">
            <img src={img} height="300" width="300" class="card-img-top" alt="food"/>
            <div class="card-body">
                <h4 class="card-title">{this.state.title}</h4>
                <p class="card-text">{this.state.summary}</p>
                <a href={'/recipes/'+this.props.id} class="btn btn-primary">View</a>
            </div>
            
        </div>
        );
    }
}

const condition = authUser => true;
export default withFirebase(PreviewCard);