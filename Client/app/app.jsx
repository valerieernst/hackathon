import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Jumbotron } from 'react-bootstrap';

import NavBar from '../nav.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron>
          <h3> 25% of homeowners in America struggle with their monthly mortgage payments</h3>
          <p>
            <Button > <Link to="/owners"> Owners </Link></Button>
            <Button> <Link to="/investors"> Investors </Link> </Button>
          </p>
        </Jumbotron>
        {this.props.children}
      </div>
    );
  }
}
export default App;
