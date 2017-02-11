import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import App from './app/app.jsx';
import Investors from './Investors/Investors.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="investors" component={Investors} />
      <Route path="owners" component={Investors} />
    </Route>
  </Router>,
  document.getElementById('root'),
);
