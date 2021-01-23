import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <NavigationBar />
    
  </div>
);
const NavigationBar = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="Home">Mayfly</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      {
        /*
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      
      <li class="nav-item">
        <Link class="nav-link" to={ROUTES.LANDING}>Landing</Link>
      </li>
        */
      }
      <li class="nav-item">
        <Link class="nav-link" to={ROUTES.HOME}>Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.LANDING}>LandingPage</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.SIGN_IN}>SignIn</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to={ROUTES.CREATE_RECIPE}>New Recipe</Link>
      </li>
    </ul>
  </div>
</nav>
  
);
const NavigationNonAuth = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="Home">Mayfly</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav">
    <li class="navbar-item">
      <Link class="nav-link" to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li class="navbar-item">
      <Link class="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
  </div>
  </nav>
);
export default Navigation;
