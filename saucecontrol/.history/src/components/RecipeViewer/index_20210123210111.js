import React, { useState, useEffect, Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { withFirebase } from '../Firebase';
const initFields = {
    title: "",
    steps: [],
    ingredients: [],
    summary: ""
}
class RecipeViewer extends Component {
   
    constructor(props) {
        super(props);
        this.state = initFields;
        this.params = props.match.params;
    }
    onResult = (querySnapshot) => {
        console.log(querySnapshot.data())
        this.setState({ingredients:querySnapshot.data().ingredients,
                        steps:querySnapshot.data().steps,
                        summary:querySnapshot.data().summary,
                        title:querySnapshot.data().title})
    } 
    onError  = () => {
        console.log("ahhhhh")
    }
    componentDidMount = () => {
        this.props.firebase.db.collection('recipes')
        .doc(this.params.recipe).onSnapshot(this.onResult, this.onError)
    }
    render () {
        console.log(this.state.ingredients)
        console.log("rendering")
    let steps = this.state.steps.map((element) => <div>{element.step_summary}</div>)

    let ingredients = this.state.steps.map((element) => <div>{element.amount} {element.name}</div>)
        return (
        <div><h2>{this.state.title}</h2>
        <p>{this.state.summary}</p>
        <h3>Ingredients</h3>

        <h3>Steps</h3>
        {steps}
        </div>
        
        )
    }
}

export default withFirebase(RecipeViewer);