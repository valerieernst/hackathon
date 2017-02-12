import React, { Component, PropTypes } from 'react';
import { Well, Button, Image, Row, Col } from 'react-bootstrap';

const Property = props => (
  <Well>
    <Row>
      <Col xs={6} sm={6} md={6}>
        <h4>{`${props.city}, ${props.zip}`}</h4>
      </Col>
      <Col xs={6} sm={6} md={6}>
        <h4>{`Return: ${props.discount}`}</h4>
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={4} md={4}>
        <Image src={props.image} thumbnail />
      </Col>
      <Col xs={12} sm={8} md={8}>
        <Row>
          <Col sm={12}>
            Term of investing: {props.term}
          </Col>
          <Col sm={12}>
            Monthly payment: {props.monthly}
          </Col>
          <Col sm={12}>
            Total investment: {props.total}
          </Col>
          <Col sm={12}>
            <Button onClick={() => { console.log('OPENS THE CHAT') ;}}>Ask a Question</Button>
          </Col>
          <Col sm={12}>
            <Button onClick={() => { console.log('CHECK IF LOGGED IN'); }}>Invest Now</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Well>
    );

Property.propTypes = {
  image: PropTypes.string,
  zip: PropTypes.string,
  city: PropTypes.string,
  value: PropTypes.string,
  discount: PropTypes.string,
  total: PropTypes.number,
  monthly: PropTypes.string,
  term: PropTypes.number,
};

export default Property;
