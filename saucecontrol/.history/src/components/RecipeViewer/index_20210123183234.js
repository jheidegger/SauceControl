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
        console.log("doc is ")
        console.log(docRef.data())
    }
    render () {
        return (
        <div>{this.params.recipe}</div>
        )
    }
}

export default withFirebase(RecipeViewer);