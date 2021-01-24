import React, { useState, useEffect, Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { withFirebase } from '../Firebase';
import {Link} from 'react-router-dom'
const initFields = {
    title: "",
    steps: [],
    ingredients: [],
    summary: "",
    user: ""
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
                        title:querySnapshot.data().title,
                        owner:querySnapshot.data().user,
                        date:querySnapshot.data().date})
    } 
    onError  = () => {
        console.log("ahhhhh")
    }
    componentDidMount = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        let user=data;
        //console.log(user);
        this.setState({user: user});
        this.props.firebase.db.collection('recipes')
        .doc(this.params.recipe).onSnapshot(this.onResult, this.onError)
    }
    render () {
        console.log(this.state.ingredients)
        console.log("rendering")
    let steps = this.state.steps.map((element) => <div>{element.step_summary}</div>)
    let ingredients = this.state.ingredients.map((element) => <div>{element.amount} {element.name}</div>)
    let edit = <div></div>
    console.log("user is")
    console.log(this.state.user.jt)
    console.log("owner is ")
    console.log(this.state.owner)
    if (this.state.owner == this.state.user.jt) {
         edit = <Link to={{
            pathname: '/recipe-submit',
            state: {
                parentState: this.state,
                editMode: "edit",
                parent: this.params.recipe
            }
          }}> 
          <button>Edit</button>
          </Link>
    }
        return (
        <div><h2>{this.state.title}</h2>
        {this.state.owner}, {this.state.date}
        <p>{this.state.summary}</p>
        <h3>Ingredients</h3>
        {ingredients}
        <h3>Steps</h3>
        {steps}
        {edit}
        <Link to={{
            pathname: '/recipe-submit',
            state: {
                parentState: this.state,
                editMode: "fork",
                parent: this.params.recipe
            }
          }}> 
          <button>Copy and Edit</button>
          </Link>
          {/* this should be conditioned on owning the recipe */}
          
        )
        </div>
        )
    }
}

export default withFirebase(RecipeViewer);