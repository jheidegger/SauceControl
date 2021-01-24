import React, { useState, Component } from 'react';
import PreviewCard from './PreviewCard';
class Tree extends Component {
  render() {
  return <PreviewCard id={props.match.params.recipe}/>;
    }
};
export default Tree;