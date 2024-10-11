import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Classes from './components/Classes';
import Contact from './components/Contact';
import GymPasses from './components/GymPasses';
import Home from './components/Home';
import Layout from './components/layout'; // Changed 'Layout' to 'layout'

import './App.css'; // This should come at the end after React imports.

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gym-passes" component={GymPasses} />
          <Route path="/classes" component={Classes} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
