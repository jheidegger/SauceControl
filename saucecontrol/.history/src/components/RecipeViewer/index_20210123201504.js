import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
const initFields = {
    title: "Generic"
}
class RecipeViewer extends Component {
   
    constructor(props) {
        super(props);
        this.setState(initFields);
        this.params = props.match.params;
    }
    onResult(querySnapshot) {
        console.log(querySnapshot)
    } 
    componentDidMount = () => {
        this.props.firebase.db.collection('recipes')
        .doc(this.params.recipe).onSnapshot(this.onResult, this.onResult)
    }
    render () {
        return (
        <div></div>
        )
    }
}

export default withFirebase(RecipeViewer);