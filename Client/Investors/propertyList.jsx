import React, { PropTypes } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Property from './property.jsx';

const PropertyList = (props) => {
  const propertyList = props.houseData.map(({ discount, zipcode, value, id, image, city }) => (
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
    <Panel>
      {propertyList}
    </Panel>
  );
};

PropertyList.propTypes = {
  discountRange: PropTypes.objectOf(PropTypes.number),
  monthlyInvestmentRange: PropTypes.objectOf(PropTypes.number),
  state: PropTypes.arrayOf(PropTypes.string),
  valueRange: PropTypes.objectOf(PropTypes.number),
  houseData: PropTypes.arrayOf(PropTypes.object),
};

export default PropertyList;
