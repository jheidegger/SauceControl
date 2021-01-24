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
        this.setState({ingredients:querySnapshot.ingredients,
                        steps:querySnapshot.steps,
                        summary:querySnapshot.summary,
                        title:querySnapshot.title})
    } 
    onError  = () => {
        console.log("ahhhhh")
    }
    componentDidMount = () => {
        this.props.firebase.db.collection('recipes')
        .doc(this.params.recipe).onSnapshot(this.onResult, this.onError)
    }
    render () {
        let title = this.state.title;
        return (
        <div>{title}</div>
        )
    }
}

export default withFirebase(RecipeViewer);