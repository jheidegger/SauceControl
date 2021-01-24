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
        var docRef = this.props.firebase.db.collection('recipes')
        .doc(this.params.recipe).get().then((doc) = {
            this.setState({"title" : doc.data().title})
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
        console.log("mounting ")
        
    }
    render () {
        return (
        <div></div>
        )
    }
}

export default withFirebase(RecipeViewer);