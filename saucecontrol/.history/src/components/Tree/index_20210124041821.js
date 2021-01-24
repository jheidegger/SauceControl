import React, { useState, Component } from 'react';
import PreviewCard from '../PreviewCard';
class Tree extends Component {
  render() {
  return <PreviewCard id={this.props.match.params.recipe}/>;
    }
};
export default Tree;