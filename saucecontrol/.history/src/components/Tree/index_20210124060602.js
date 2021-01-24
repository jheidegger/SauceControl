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
                    recipes[doc.id] = doc.data();
            }); 
            var cur = recipes[this.props.match.params.recipe]
            var ancestors = [];
            console.log(cur)
            var descendants = [];
            while(cur.parent !== "") {
                
                ancestors.push(cur.parent)
                cur = recipes[cur.parent]
            }
            console.log("building from " + ancestors[ancestors.length - 1])
             
            var stack = []
            stack.push([ancestors[ancestors.length - 1],0])
             
            while(stack.length > 0) {
                var cur = stack.shift();
                descendants.push(cur)
                console.log(cur)
                recipes[cur[0]].children.forEach(element => {
                    stack.push([element, cur[1] + 1])
                });
            }
        this.setState({ancestors: ancestors,
                        descendants: descendants});
        console.log(descendants) 
    } 
  render() {
        var top = this.state.ancestors.map(elem => <PreviewCard id={elem}/>).reverse()
        return top;
    }
};
export default withFirebase(Tree);