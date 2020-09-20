import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import Records from './components/pages/Records';
import Charts from './components/pages/Charts';

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
       <Route path="/charts">
           <Charts />
       </Route>
   </Switch>
  </BrowserRouter>
);

export default Routes;