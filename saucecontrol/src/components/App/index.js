import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SearchResults from '../Search';
import * as ROUTES from '../../constants/routes';
import CreateRecipe from '../Recipe';
import RecipeViewer from '../RecipeViewer';
const App = () => (
  
  <Router>
    <div>
      <Route component = {Navigation}/>

     
      
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path="/recipes/:recipe" component={RecipeViewer} />
      <Route path="/search/:search" component={SearchResults} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.CREATE_RECIPE} component={CreateRecipe} />
    </div>
  </Router>
);
export default App;
