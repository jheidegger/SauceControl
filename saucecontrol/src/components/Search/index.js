import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import PreviewCard from "../PreviewCard";

const init_fields = {
    recipes: [],
    recipeTitles: [],
    search:""
}
class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {... init_fields};
        this.params = props.match.params;
    }
    componentDidMount = () => {
       this.updateSearch(this.params.search);
    }
    componentWillReceiveProps(nextProps) {
        this.updateSearch(nextProps.match.params.search);
        this.params = nextProps.match.params;
        this.setState(init_fields);
        console.log(nextProps);
    }
    onResult = (querySnapshot) => {
        console.log(this.params.search)
       
       var recipes = [];
       var recipeTitles = [];
       var search = this.params.search.toLowerCase();
       console.log(search)
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
                if(doc.data().title.toLowerCase().includes(search)){
                    console.log(doc.id, " => ", doc.data().title);
                    recipes.push(doc.id);
                    recipeTitles.push(doc.data().title);
                    console.log(recipes)
                }
            });
        console.log(recipeTitles);
        this.setState({recipes: recipes,
            recipeTitles: recipeTitles});
    } 
    onError  = () => {
        console.log("ahhhhh")
    }
    updateSearch = (search) => {
        
        console.log(search)
        this.props.firebase.db.collection("recipes").where("visible","==",true).get().then(this.onResult);
        
    }
    render(){
        var recipeCards = this.state.recipes.map((id)=><PreviewCard id={id}/>)
        return(
            <div class="d-flex justify-content-center">
                <div class="col-3">
                {recipeCards}
                </div>
                
            </div>
            
        );
    }
}
export default withFirebase(SearchResults);
