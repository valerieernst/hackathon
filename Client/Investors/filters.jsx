import React, { Component, PropTypes } from 'react';
import { Range } from 'rc-slider';
import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import 'rc-slider/assets/index.css';


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roi: [0, 100],
      monthly: [100, 10000],
      locations: [],
      term: [],
      value: [200000, 2000000],
    };
  }
  updateSliders(key, value) {
    this.setState({
      [key]: value,
    });
  }
  updateArrays(key, value) {
    const index = this.state[key].indexOf(value);
    const temp = this.state[key].slice();
    if (index < 0) {
      temp.push(value);
    } else {
      temp.splice(index, 1);
    }
    this.setState({
      [key]: temp,
    });
  }
  render() {
    return (
      <div>
        <Row>
          <div className="slider">
            <p>Return on Investment, %</p>
            <Range
              min={0}
              max={100}
              marks={{ 0: this.state.roi[0], 100: this.state.roi[1] }}
              value={this.state.roi}
              onChange={(e) => { this.updateSliders('roi', e); }}
            />
          </div>
        </Row>
        <Row>
          <div>
            <p>Term of Investment, months</p>
            <FormGroup>
              <Checkbox onClick={() => { this.updateArrays('term', 6); }} value={6} inline>
                6
              </Checkbox>
              <Checkbox onClick={() => { this.updateArrays('term', 12); }} value={12}inline>
                12
              </Checkbox>
              <Checkbox onClick={() => { this.updateArrays('term', 18); }} value={18}inline>
                18
              </Checkbox>
            </FormGroup>
          </div>
        </Row>
        <Row>
          <div className="slider">
            <p>Monthly Investment</p>
            <Range
              min={100}
              max={10000}
              marks={{ 100: this.state.monthly[0], 10000: this.state.monthly[1] }}
              step={10}
              value={this.state.monthly}
              onChange={(e) => { this.updateSliders('monthly', e); }}
            />
          </div>
        </Row>
        <Row>
          <div className="slider">
            <p>Home Value</p>
            <Range
              min={200000}
              max={2000000}
              step={1000}
              marks={{ 200000: this.state.value[0], 2000000: this.state.value[1] }}
              value={this.state.value}
              onChange={(e) => { this.updateSliders('value', e); }}
            />
          </div>
        </Row>
        <Row className="state-select">
          <FormGroup controlId="formControlsSelectMultiple">
            <Col xs={6} sm={6} md={6}>
              <ControlLabel>Select Locations:</ControlLabel>
              <small>Hold Ctrl/Cmd key to select multiple options</small>
            </Col>
            <Col xs={6} sm={6} md={6}>
              <FormControl componentClass="select" multiple onClick={(e) => { this.updateArrays('locations', e.target.value); }} >
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="DC">DC</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </FormControl>
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <Button type="submit" onClick={() => { this.props.filterProperties(this.state); }}> Apply Filters </Button>
        </Row>
      </div>
    );
  }
}

export default Filters;
