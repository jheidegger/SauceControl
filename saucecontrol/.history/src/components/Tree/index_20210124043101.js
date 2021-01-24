import React, { useState, Component } from 'react';
import withFirebase from '../Firebase'
import PreviewCard from '../PreviewCard';
class Tree extends Component {
    componentDidMount() {
        console.log(this.props.firebase.getParent(this.props.match.params.recipe))
    }
    
  render() {
  return <PreviewCard id={this.props.match.params.recipe}/>;
    }
};
export default withFirebase(Tree);