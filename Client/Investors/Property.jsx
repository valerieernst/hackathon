import React, { Component, PropTypes } from 'react';
import { Well, Button, Image, Row, Col } from 'react-bootstrap';

const Property = props => (
  <Well>
    <Row>
      <Col xs={6} sm={4} md={4}>
        <Image src={props.image} thumbnail />
      </Col>
      <Col xs={6} sm={8} md={8}>
        <Row>
          <Col sm={6}>
            Current value: {props.value}
          </Col>
          <Col sm={6}>
            Discount: {props.discount}
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            City: {props.city}
          </Col>
          <Col sm={6}>
            Zipcode: {props.zip}
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
};

export default Property;
