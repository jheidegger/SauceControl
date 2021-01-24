import React, { Component} from 'react';
import { withFirebase } from '../Firebase';
import {Row,Col,Card,Button} from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { Link, withRouter, Route } from 'react-router-dom';

const INITIAL_STATE = {
    title: '',
    summary: '',
    img: '',
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
                        title:querySnapshot.data().title})
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
        return (
        <Link to={'/recipes/'+this.props.id}>
        <div class="card" hoverable>
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{this.state.title}</h5>
                <p class="card-text">{this.state.summary}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">PUT TOTAL TIME</small>
            </div>
        </div>
        </Link>
        );
    }
}

const condition = authUser => true;
export default withFirebase(PreviewCard);