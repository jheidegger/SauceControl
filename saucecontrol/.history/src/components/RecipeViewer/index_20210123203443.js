import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
const initFields = {
    title: "Generic"
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
        console.log("rendering")
        let steps = this.state.steps.map((elem) => <div>elem</div>)
        return (
        <div><h2>{this.state.title}</h2>
        <p>{this.state.summary}</p>
        steps
        </div>
        
        )
    }
}

export default withFirebase(RecipeViewer);