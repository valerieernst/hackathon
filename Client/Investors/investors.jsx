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
      propertyList: [],
      openFilters: false,
      activeFilters: {},
    };
    this.filterProperties = this.filterProperties.bind(this);
  }
  componentWillMount() {
    this.getPropertyList();
  }

  getPropertyList() {
    axios.get('/getPropertyList')
    .then((res) => {
      console.log('data from server', res.data);
      this.setState({
        houseData: res.data,
        propertyList: res.data,
      });
    })
    .catch(err => console.error('Error getting property list: ', err));
  }
  showFilters() {
    this.setState({
      openFilters: !this.state.openFilters,
    });
  }
  filterProperties({ roi, value, monthly, locations, term }) {
    const filteredProperties = this.state.houseData.filter((property) => {
      let filter = false;
      if (property.discount >= roi[0] && property.discount <= roi[1]
        && property.value >= value[0] && property.value <= value[1]
        && property.monthly >= monthly[0] && property.monthly <= monthly[1]) {
        filter = true;
        if (locations.length) {
          filter = locations.indexOf(property.state) >= 0;
        }
        if (term.length) {
          filter = term.indexOf(property.term) >= 0;
        }
      }
      return filter;
    });
    this.setState({
      propertyList: filteredProperties,
    }, () => { console.log(this.state.houseData); });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xsHidden sm={3} md={3} >
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
          <Col xs={12} sm={9} md={9}>
            <PropertyList houseData={this.state.houseData} propertyList={this.state.propertyList} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
Investors.propTypes = {

};

export default Investors;
