import React, { useState, useEffect, Component } from 'react';
import { withFirebase } from '../Firebase';
class RecipeViewer extends Component {
    constructor(props) {
        super(props);
        const params = props.match.params;
        console.log(props.match.params)
    }
    render () {
        return (
        <div>{this.match.params}</div>
        )
    }
}

export default withFirebase(RecipeViewer);