import React, { useState, Component } from 'react';
import {withFirebase} from '../Firebase'
import PreviewCard from '../PreviewCard';
class Tree extends Component {
    componentDidMount() {
        this.props.firebase.db.collection("recipes").get().then(this.onResult);
    }
    onResult = (querySnapshot) => {
        var recipes = {};
         querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                    recipes[doc.id] = doc.data().parent;
            }); 
            var cur = recipes[this.props.match.params.recipe]
            var ancestors = [this.props.match.params.recipe];
            while(recipes[cur] !== undefined) {
                ancestors.push(cur)
                cur = recipes[cur]
            }
        this.setState({ancestors: ancestors});
        console.log(ancestors) 
    } 
  render() {
      this.state.ancestors.map(elem => <PreviewCard id={this.props.match.params.recipe}/>)
  return <PreviewCard id={this.props.match.params.recipe}/>;
    }
};
export default withFirebase(Tree);