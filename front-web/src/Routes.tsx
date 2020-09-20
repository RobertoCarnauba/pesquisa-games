import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import Records from './components/pages/Records';

const Routes = () => (
  <BrowserRouter>
   <Header />
   <Switch>
       <Route path="/" exact>
           <Home />
       </Route>
       <Route path="/records">
           <Records />
       </Route>
   </Switch>
  </BrowserRouter>
);

export default Routes;