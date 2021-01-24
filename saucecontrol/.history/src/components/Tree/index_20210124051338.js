import React, { useState, Component } from 'react';
import {withFirebase} from '../Firebase'
import PreviewCard from '../PreviewCard';
const init_fields = {
    ancestors: []
}
class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = init_fields;
    }
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
        var top = this.state.ancestors.map(elem => <PreviewCard id={elem}/>).reverse()
        return top;
    }
};
export default withFirebase(Tree);