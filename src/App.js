import './css/main.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import StartCompnent from './components/StartCompnent';
import BudgetPage from './components/BudgetPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/start' />
        </Route>
        <Route exact path='/start' component={StartCompnent} />
        <Route
          exact
          path='/enter-your-income-and-expenses'
          component={BudgetPage}
        />
        <Route exact path='/visualized-data' component={BudgetPage} />
      </Switch>
    </Router>
  );
}

export default App;
