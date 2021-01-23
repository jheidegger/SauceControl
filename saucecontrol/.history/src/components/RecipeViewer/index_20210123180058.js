import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
class RecipeViewer extends Component {
    constructor(props) {
        super(props);
        const params = props.match.params;
        console.log(params.recipe)
    }
    render () {
        return (
        <div>this is dynamic url component</div>
        )
    }
}

export default withFirebase(RecipeViewer);