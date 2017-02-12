import React, { Component, PropTypes } from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import PropertyList from './propertyList.jsx';
import Filters from './filters.jsx';

class Investors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseData: [],
      openFilters: false,
    };
    this.filterProperties = this.filterProperties.bind(this);
  }
  componentWillMount() {
    this.getPropertyList();
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
  showFilters() {
    this.setState({
      openFilters: !this.state.openFilters,
    });
  }
  filterProperties(filteredData) {
    this.setState({
      houseData: filteredData,
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xsHidden sm={3} md={4} >
            <Filters filterProperties={this.filterProperties} houseData={this.state.houseData} />
          </Col>
          <Col xs={12} smHidden mdHidden lgHidden>
            <Button onClick={() => { this.showFilters(); }} > Show Filters </Button>
            <Panel collapsible expanded={this.state.openFilters}>
              <Row>
                <Col xs={10} xsOffset={1}>
                  <Filters filterProperties={this.filterProperties} houseData={this.state.houseData} />
                </Col>
              </Row>
            </Panel>
          </Col>
          <Col xs={12} sm={9} md={8}>
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
