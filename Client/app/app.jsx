import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

import NavBar from '../nav.jsx';

const App = () => (
  <div>
    <NavBar />
    <Button><Link to="/owners"> Investors </Link></Button>
    <Button> <Link to="/investors"> Investors </Link> </Button>
  </div>
);
export default App;
