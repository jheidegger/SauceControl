import React, { Component } from 'react';
import PreviewCard from '../PreviewCard';

const initFields = {
  user: null,
  recipes: []
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {... initFields};
  }
  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    let user=data;
    console.log(user);
    this.setState({user: user});

    var email = this.getEmail();
    this.grabRecipes(email);

  }

  grabRecipes = (email) => {
    this.props.firebase.db.collection("recipes").get().then(this.onResult);
  }

  onResult = (querySnapshot) => {
   var recipes = [];
   var search = this.getEmail();
   console.log(search)
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
            if(doc.data().user.toLowerCase().includes(search)){
                console.log(doc.id, " => ", doc.data().user);
                recipes.push(doc.id);
                console.log(recipes)
            }
        });
    console.log(recipeTitles);
    this.setState({recipes: recipes});
  } 

  isSignedIn() {
    return (this.state.user !== null)
  }
  getFirstName() {
    if(this.state.user !==null) {
      return this.state.user.bT;
    }
    else {
      return "no name";
    }
  }
  getLastName() {
    if(this.state.user !==null) {
      return this.state.user.dR;
    }
    else {
      return "no name";
    }
  }
  getEmail() {
    if(this.state.user !==null) {
      return this.state.user.jt;
    }
    else {
      return "no Email";
    }
  }
  getProfileImageLink() {
    if(this.state.user !==null) {
      return this.state.user.fI;
    }
    else {
      return "no Email";
    }
  }
  render(){
    var recipeCards = this.state.recipes.map((id)=><PreviewCard id={id}/>)
    return(
      <div class="container-fluid">
        <div class="row"><h1 class="s-4 animate__animated animate__fadeInLeft">Hello {this.getFirstName()}</h1></div>
            <div class="d-flex justify-content-center">
                <div class="col-3">
                  {recipeCards}
                </div> 
            </div>
        </div>);
  }
}
class userData extends Component {
  constructor(props) {
    super(props)
    this.state = {user:null};
  }
  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    let user=data;
    console.log(user);
    this.setState({user: user});
  }
  isSignedIn() {
    return (this.state.user !== null)
  }
  getFirstName() {
    if(this.state.user !==null) {
      return this.state.user.bT;
    }
    else {
      return "no name";
    }
  }
  getLastName() {
    if(this.state.user !==null) {
      return this.state.user.dR;
    }
    else {
      return "no name";
    }
  }
  getEmail() {
    if(this.state.user !==null) {
      return this.state.user.jt;
    }
    else {
      return "no Email";
    }
  }
  getProfileImageLink() {
    if(this.state.user !==null) {
      return this.state.user.fI;
    }
    else {
      return "no Email";
    }
  }





  render(){

    return;
  }
}

export default Home;
