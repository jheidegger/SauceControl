import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
class RecipeViewer extends Component {
    constructor(props) {
        super(props);
        params = props.match.params;
        console.log(params.recipe)
    }
    render () {
        return (
        <div>{this.params.recipe}</div>
        )
    }
}

export default withFirebase(RecipeViewer);