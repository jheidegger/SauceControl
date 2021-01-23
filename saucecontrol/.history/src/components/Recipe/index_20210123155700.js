import React, { useState, useEffect, Component } from 'react';
 
import * as ROUTES from '../../constants/routes';
import Button from 'react-bootstrap/Button'
import { withFirebase } from '../Firebase';
import app from 'firebase/app';
import  { FirebaseContext } from '../Firebase';
const initFields = {
    name: '',
    summary: '',
    picture: '',
    ingredients: [{name: "", amount:""}],
    steps: [],
    times: [],
    serves: '',
    tags: []
}

class CreateRecipe extends Component {
    
    constructor(props) {
        super(props);
        this.state = {... initFields};
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
            <button className="btn btn-secondary" type="button" onClick={(e)=>this.removeStepInput(e,index)}>{this.state.ingredients[index].name ? `Delete ${this.state.ingredients[index].name}` : `Delete Ingredient`}</button>
            
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
      this.props.firebase.insert_recipe(this.state)
      this.props.history.push('/')
  }
    

    render() { 

    return (
      <div>
         <h1>Add a new recipe!</h1>
        <form onSubmit={this.handleSumbit} >
          <fieldset>
            <div class="form-group">
              <label for="inputDefault">Title</label>
              <input 
                type="inputDefault" 
                name="name"
                class="form-control" 
                id="inputDefault"
                placeholder="name"
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
                  placeholder="80 characters max"></textarea>
            </div>
{/* 
            <div class="form-group">
              <label>Ingredients</label>
              {this.renderIngredientInputs()}
              <button type="button" className="btn btn-primary" onClick={()=> this.addIngredientInputs()}>+ Add Ingredient</button>
            </div>
*/}
            <div class="form-group">
              <label forHtml="textArea">Steps</label>
              {this.renderStepInputs()}
              <button type="button" className="btn btn-primary" onClick={()=> this.addStepInputs()}>+ Add Step</button>
            </div> 
            
            <input type="submit" className="btn btn-secondary"></input>
          </fieldset>
        </form>
        <div className="col-4"></div>
  </div>
       
    );
    }
}


 
export default withFirebase(CreateRecipe);

