import React from 'react';
import { Range } from 'rc-slider';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'rc-slider/assets/index.css';


const Filters = () => (
  <div>
    <Row>
      <div className="slider">
        <p>Discount, %</p>
        <Range min={0} max={100} marks={{ 0: 0, 100: 100 }} defaultValue={[0, 100]} />
      </div>
    </Row>
    <Row>
      <div className="slider">
        <p>Monthly investment</p>
        <Range min={100} max={10000} marks={{ 100: 100, 10000: '10,000' }} defaultValue={[100, 20000]} />
      </div>
    </Row>
    <Row>
      <div className="slider">
        <p>Home value</p>
        <Range min={200000} max={2000000} marks={{ 200000: '200,000', 2000000: '2,000,000' }} defaultValue={[200000, 2000000]} />
      </div>
    </Row>
    <Row>
      <FormGroup controlId="formControlsSelectMultiple">
        <Col xs={6} sm={6} md={6}>
          <ControlLabel>Select Locations:</ControlLabel>
          <p>Hold Ctrl/Cmd key to select multiple options</p>
        </Col>
        <Col xs={6} sm={6} md={6}>
          <FormControl componentClass="select" multiple>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </FormControl>
        </Col>
      </FormGroup>
    </Row>
  </div>
);

export default Filters;
