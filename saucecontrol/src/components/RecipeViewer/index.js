import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
class RecipeViewer extends Component {
    constructor(props) {
        super(props);
        this.params = props.match.params;
        console.log(this.params.recipe)
    }
    componentDidMount = () => {
        var postRef= this.props.firebase.db.ref('recipes/' + this.params.recipe)
        
    }
    render () {
        return (
        <div>{this.params.recipe}</div>
        )
    }
}

export default withFirebase(RecipeViewer);