import React, { useState, Component } from 'react';
import {withFirebase} from '../Firebase'
import PreviewCard from '../PreviewCard';
class Tree extends Component {
    componentDidMount() {
        this.props.firebase.db.collection("recipes").get().then(this.onResult);
    }
    onResult = (querySnapshot) => {
        console.log(querySnapshot)
        console.log(this.params.search)
      /*  var recipesDescending = [];
       var recipeTitles = [];
       var search = this.params.search.toLowerCase();
       console.log(search) 
        console.log(queryS)
        /* querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                if(doc.data().title.toLowerCase().includes(search)){
                    console.log(doc.id, " => ", doc.data().title);
                    recipes.push(doc.id);
                    recipeTitles.push(doc.data().title);
                    console.log(recipes)
                }
            }); */
            /*()
        console.log(recipeTitles);
        this.setState({recipes: recipes,
            recipeTitles: recipeTitles}); */
    } 
  render() {
  return <PreviewCard id={this.props.match.params.recipe}/>;
    }
};
export default withFirebase(Tree);