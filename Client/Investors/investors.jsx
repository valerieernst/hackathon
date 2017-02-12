import React, { Component, PropTypes } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Property from './Property.jsx';

const Investors = () => {
  const propertyList = dummyHomes.map(({ discount, zipcode, value, id, image, city }) => (
    <Property
      image={image}
      zip={zipcode}
      value={value}
      key={id}
      discount={discount}
      city={city}
    />
 ),
);

  return (
    <Grid>
      <Row>
        <Panel>
          {propertyList}
        </Panel>
      </Row>
    </Grid>
  );
};

Investors.propTypes = {

};

export default Investors;


const dummyHomes = [{
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  image: 'house.png',
  monthlyInvestment: '1,000',
  discount: '15%',
  value: '1,000,000',
  id: 1,
}, {
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  image: 'house.png',
  monthlyInvestment: '1,000',
  discount: '15%',
  value: '1,000,000',
  id: 2,
}, {
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  image: 'house.png',
  monthlyInvestment: '1,000',
  discount: '15%',
  value: '1,000,000',
  id: 3,
}];
