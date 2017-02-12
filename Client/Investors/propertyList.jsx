import React, { PropTypes } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Property from './property.jsx';

const PropertyList = ({ houseData, propertyList }) => {
  const list = propertyList.length ? propertyList : houseData;
  const noResults = propertyList.length ? '' : <h5> Sorry, no results. Here are all the listed houses:</h5>;
  const properties = list.map(({ discount, zipcode, value, id, image, city, total, monthly, term }) => (
    <Property
      image={image}
      zip={zipcode}
      value={value}
      key={id}
      discount={discount}
      city={city}
      total={total}
      monthly={monthly}
      term={term}
    />
 ),
);
  return (
    <div>
      <Panel>
        {noResults}
        {properties}
      </Panel>
    </div>
  );
};

PropertyList.propTypes = {
  discountRange: PropTypes.objectOf(PropTypes.number),
  monthlyInvestmentRange: PropTypes.objectOf(PropTypes.number),
  state: PropTypes.arrayOf(PropTypes.string),
  valueRange: PropTypes.objectOf(PropTypes.number),
  houseData: PropTypes.arrayOf(PropTypes.object),
  propertyList: PropTypes.arrayOf(PropTypes.object),
};

export default PropertyList;
