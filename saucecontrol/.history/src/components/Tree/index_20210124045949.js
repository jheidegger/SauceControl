import React, { useState, Component } from 'react';
import {withFirebase} from '../Firebase'
import PreviewCard from '../PreviewCard';
class Tree extends Component {
    componentDidMount() {
        this.props.firebase.db.collection("recipes").get().then(this.onResult);
    }
    onResult = (querySnapshot) => {
        var recipes = [];
         querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                    recipes.push([doc.id: doc.data().parent]);
            }); 
        this.setState({recipes: recipes,
            recipeTitles: recipeTitles}); 
    } 
  render() {
  return <PreviewCard id={this.props.match.params.recipe}/>;
    }
};
export default withFirebase(Tree);