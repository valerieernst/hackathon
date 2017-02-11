import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

const MainPage = () => (
  <Jumbotron>
    <h3> 25% of homeowners in America struggle with their monthly mortgage payments</h3>
    <p>
      <Button > <Link to="/owners"> Owners </Link></Button>
      <Button> <Link to="/investors"> Investors </Link> </Button>
    </p>
  </Jumbotron>
);
export default MainPage;

