import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route } from 'react-router';

import App from './app/app.jsx';
import Investors from './Investors/Investors.jsx';
import MainPage from './app/jumbo.jsx';
import Qualify from './Qualify/qualifyPage.jsx';
import SignUp from './Auth/signup.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="" component={App}>
      <Route path="/" component={MainPage} />
      <Route path="investors" component={Investors} />
      <Route path="owners" component={Qualify} />
      <Route path="signup" component={SignUp} />
    </Route>
  </Router>,
  document.getElementById('root'),
);
