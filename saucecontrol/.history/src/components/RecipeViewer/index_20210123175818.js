import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
class RecipeViewer extends Component {
    constructor(props) {
        super(props);
        const params = props.params;
        console.log(params)
    }
    render () {
        return (
        <div>{this.params.recipe}</div>
        )
    }
}

export default withFirebase(RecipeViewer);