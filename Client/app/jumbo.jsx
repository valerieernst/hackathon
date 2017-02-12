import React, { Component } from 'react';
import { Button, Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const MainPage = () => (
  <Grid>
    <Row>
      <Col sm={12}>
        <Jumbotron>
          <Row>
            <Col sm={12} md={8} mdOffset={2}>
              <h3> 25% of homeowners in America struggle with their monthly mortgage payments</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={4} xsOffset={2} sm={3} smOffset={3} md={2} mdOffset={4}>
              <Button > <Link to="/owners"> Owners </Link></Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button> <Link to="/investors"> Investors </Link> </Button>
            </Col>
          </Row>
        </Jumbotron>
      </Col>
    </Row>
  </Grid>
);
export default MainPage;

