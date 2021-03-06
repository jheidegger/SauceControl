import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
class RecipeViewer extends Component {
    constructor(props) {
        super(props);
        this.params = props.match.params;
        console.log(this.params.recipe)
    }
    componentDidMount = () => {
        var docRef = this.props.firebase.db.collection('recipes').doc(this.params.recipe)
        docRef.get().then(function(doc) {
            // Document was found in the cache. If no cached document exists,
            // an error will be returned to the 'catch' block below.
            console.log("Cached document data:", doc.data());
            this.setState(["title":doc.data().title])
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });
    }
    render () {
        return (
        <div>{this.params.recipe}</div>
        )
    }
}

export default withFirebase(RecipeViewer);