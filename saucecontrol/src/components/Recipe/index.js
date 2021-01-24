import React, { useState, useEffect, Component } from 'react';
 
import ImageUploader from 'react-images-upload'
import * as ROUTES from '../../constants/routes';
import Button from 'react-bootstrap/Button'
import { withFirebase } from '../Firebase';
import app from 'firebase/app';
import  { FirebaseContext } from '../Firebase';

import "./styles.css";

const initFields = {
    title: '',
    summary: '',
    picture: '',
    ingredients: [],
    steps: [],
    times: [],
    serves: '',
    tags: [],
    user:null,
    pictureFile: null,
    pictureFileURL: null,
    parent: "",
    mode: "fork",
    visible: true,
    date: 0
}

class CreateRecipe extends Component {
    
    constructor(props) {
        super(props);
        this.state = {... initFields};
        this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount() {
    if (this.props.location.state !== undefined && this.props.location.state.parentState !== null) {
            this.setState(this.props.location.state.parentState);
            this.setState({editMode :this.props.location.state.editMode, parent: this.props.location.state.parent});
        }
      const data = JSON.parse(sessionStorage.getItem('userData'));
      let user=data;
      //console.log(user);
      this.setState({user: user});
    }

    isSignedIn() {
      return (this.state.user !== null)
    }

    getEmail() {
      if(this.state.user !==null) {
        return this.state.user.jt;
      }
      else {
        return "no Email";
      }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    }

    handleIngredientNameChange = (event, ingredientIndex) => {
      let newIngredientName = event.target.value;
      this.setState((prev) => {
        return {
          ...prev,
          ingredients: prev.ingredients.map((ingredient, index) => {
            if (index == ingredientIndex) {
              return { ...ingredient, name: newIngredientName};
            } 
            return ingredient;
          }),
        };
      });
    };

    handleIngredientAmountChange = (event, ingredientIndex) => {
      let newIngredientAmount = event.target.value;
      this.setState((prev) => {
        return {
          ...prev,
          ingredients: prev.ingredients.map((ingredient, index) => {
            if (index == ingredientIndex) {
              return { ...ingredient, amount: newIngredientAmount};
            } 
            return ingredient;
          }),
        };
      });
    };

    addIngredientInputs = () => {
      this.setState((prev) => {
          return {
            ...prev,
            ingredients: [...prev.ingredients, { name: "", amount:"" }],
          };
        });
    }

    removeIngredientInput = (event, ingredientIndex) => {
      event.preventDefault()
      this.setState({
        ingredients: this.state.ingredients.filter((ingredient, removedIngredient) => removedIngredient !== ingredientIndex )
      })
    }

    renderIngredientInputs = () => {
      return this.state.ingredients.map((ingredient, index) => {
        return (
          <div key={`name ${index}`} 
            className="form-group">

            <input className="mb-3"
              value={this.state.ingredients[index].name}
              onChange={(event) => this.handleIngredientNameChange(event, index)}
              placeholder="Name"
              name="name"
            />

            <input
              value={this.state.ingredients[index].amount}
              onChange={(event) => this.handleIngredientAmountChange(event, index)}
              placeholder="Amount"
              name="amount"
            />
            <br></br>
            {/* </div><Button variant=""btn btn-secondary"" onClick={(e)=>this.removeIngredientInput(e,index)}>{this.state.ingredients[index].name ? `Delete ${this.state.ingredients[index].name}` : `Delete Ingredient`}</Button> */}
            <button className="btn btn-secondary" type="button" onClick={(e)=>this.removeIngredientInput(e,index)}>{this.state.ingredients[index].name ? `Delete ${this.state.ingredients[index].name}` : `Delete Ingredient`}</button>
            
          </div>
        );
      });
    };

    handleStepChange = (e, stepIndex) => {
      let newStep = e.target.value;
      this.setState((prev) => {
        return {
          ...prev,
          steps: prev.steps.map((step, index) => {
            if (index == stepIndex) {
              return { ...step, step_summary: newStep};
            } 
            return step;
          }),
        };
      });
    };

    addStepInputs = () => {
      this.setState((prev) => {
        return {
          ...prev,
          steps: [...prev.steps, ""],
        };
      });
    };

    removeStepInput = (event, stepIndex) => {
      event.preventDefault()
      this.setState({
        steps: this.state.steps.filter((step, removedStep) => removedStep !== stepIndex )
      })
    }

    renderStepInputs = () => {
      return this.state.steps.map((step, index) => {
        return (
          <div key={index} className="form-group">
            <fieldset>
              <textarea
                placeholder={`Step${index+1}`}
                name="rec_steps"
                id="textArea"
                className="form-control"
                onChange={(e) => this.handleStepChange(e, index)}
                value={step.step_summary}
              />
            <button className="btn btn-secondary" type="button" onClick={(e)=>this.removeStepInput(e,index)}>{`Delete Step ${index+1}`}</button>
            </fieldset>
          </div>
        );
      });
    };

    handleStepChange = (e, stepIndex) => {
      let newStep = e.target.value;
      this.setState((prev) => {
        return {
          ...prev,
          steps: prev.steps.map((step, index) => {
            if (index == stepIndex) {
              return { ...step, step_summary: newStep};
            } 
            return step;
          }),
        };
      });
    };

    handleSumbit = (event) => {
      event.preventDefault()
      console.log(this.state.name)
      this.setState({date: Date.now()})
      if (this.state.editMode == 'edit') {
          this.props.firebase.whiteout_recipe(this.state.parent)
      } else {
        this.props.firebase.insert_recipe(this.state)
      }
      this.props.history.push('/')
  }
    
    onDrop = (picture) => {
      console.log("I write my own handler aha! Here is the picture: ");
      console.log(picture[0])
      this.setState({
        pictureFile: picture[0],
        pictureFileURL: URL.createObjectURL(picture[0])
      })
      
  
      /*this.setState({
        picture: URL.createObjectURL(picture.target.files[0])
      })*/
    }

    render() { 

      let photoRender;
      if (this.state.pictureFileURL === null) {
        photoRender = <ImageUploader 
                        buttonText='Choose Image'
                        onChange={this.onDrop}
                      />
      }
      else {
        photoRender = <img border="3" class="centerPhoto" height="200" width="300" src={this.state.pictureFileURL}/>
      }

    return (
      <div class="container-fluid bg">
        <div class="d-flex justify-content-center p-1">
        <div class="col-sm-4">
        <div class="container-lg signInCard rounded p-2">        
        <p>
        <h1 class="centerTitle">Add a new recipe!</h1>
        </p>
        <div class="signInCardComp">
        <form onSubmit={this.handleSumbit} >
          <fieldset>
            <div class="form-group">
              <label for="inputDefault">Title</label>
              <input 
                type="inputDefault" 
                name="title"
                class="form-control" 
                id="inputDefault"
                placeholder="Enter title"
                value={this.state.title}
                onChange={this.handleChange}
                ></input>
            </div>

            <div className="form-group">
                <label forHtml="textArea">Summary </label>
                <textarea 
                  className="form-control"
                  id="textArea"
                  rows="3"
                  name="summary"
                  onChange={this.handleChange} 
                  value={this.state.summary}
                  placeholder="80 characters max"></textarea>
            </div>

            <div class="form-group">
              <div>
                <label>Ingredients</label>
              </div>
              {this.renderIngredientInputs()}
              <button type="button" className="btn btn-dark" onClick={()=> this.addIngredientInputs()}>+ Add Ingredient</button>
            </div>

            <div class="form-group">
              <div>
                <label forHtml="textArea">Steps</label>
              </div>
              {this.renderStepInputs()}
              <button type="button" className="btn btn-dark" onClick={()=> this.addStepInputs()}>+ Add Step</button>
            </div> 
            <p>
            <div>
              {photoRender}
            </div>
            </p>
            <input type="submit" className="btn btn-secondary" class="centerSubmit"></input>
          </fieldset>
        </form>
        </div>
        </div>
        </div>
        </div>
  </div>
       
    );
    }
}
 
export default withFirebase(CreateRecipe);

