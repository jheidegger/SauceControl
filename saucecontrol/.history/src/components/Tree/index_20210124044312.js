import React, { useState, Component } from 'react';
import {withFirebase} from '../Firebase'
import PreviewCard from '../PreviewCard';
class Tree extends Component {
    componentDidMount() {
        this.props.firebase.db.collection("recipes").get().then(this.onResult);
    }
    onResult() {
        
    }
  render() {
  return <PreviewCard id={this.props.match.params.recipe}/>;
    }
};
export default withFirebase(Tree);