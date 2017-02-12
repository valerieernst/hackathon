import React, { Component, PropTypes } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PropertyList from './propertyList.jsx';
import Filters from './filters.jsx';

class Investors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseData: [],
    };
    this.filterProperties = this.filterProperties.bind(this);
  }
  componentWillMount() {
    this.getPropertyList();
  }
  filterProperties(filteredData) {
    this.setState({
      houseData: filteredData,
    });
  }
  getPropertyList() {
    axios.get('/getPropertyList')
    .then((res) => {
      this.setState({
        houseData: res.data,
      });
    })
    .catch(err => console.error('Error getting property list: ', err));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={3} sm={3} md={4} >
            <Filters filterProperties={this.filterProperties} houseData={this.state.houseData} />
          </Col>
          <Col xs={9} sm={9} md={8}>
            <PropertyList houseData={this.state.houseData} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
Investors.propTypes = {

};

export default Investors;
