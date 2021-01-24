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
    author: '',
    date: ''

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
                        img:querySnapshot.data().photoURL,
                        author:querySnapshow.data().user,
                        date:querySnapshot.data().date});
        // add the cover image and time fields to this later
    } 
    onError  = () => {
        console.log("ahhhhh")
    }
    componentDidMount = () => {
        this.props.firebase.db.collection('recipes')
        .doc(this.props.id).onSnapshot(this.onResult, this.onError)
    }

    formatDate = (date) => {
        if(date === undefined) {
            return (<div>no date</div>);
        }
        var dat = new Date(date);
        return (
            <div>{dat.getMonth() + 1}/{dat.getDate()}/{dat.getFullYear()} {dat.toLocaleTimeString()}</div>
        )
    }

    render() {
        var img = logo;
        console.log(this.state.img);
        if(this.state.img !== undefined){
            img = this.state.img;
        }
        let date = <div></div>
        if (this.state.date !== undefined) {
            date = this.formatDate(this.state.date)
        }
        return (
        <div class="card">
            <img src={img} height="300" width="300" class="card-img-top" alt="food"/>
            <div class="card-body">
                <h4 class="card-title">{this.state.title}</h4>
                <p class="card-text">{this.state.summary}</p>
                <a href={'/recipes/'+this.props.id} class="btn btn-primary">View</a>
            </div>
            <div class="card-footer">
                <small class="text-muted">By: {this.state.author}</small>
                <small class="text-muted">{date}</small>
            </div>
            
        </div>
        );
    }
}

const condition = authUser => true;
export default withFirebase(PreviewCard);