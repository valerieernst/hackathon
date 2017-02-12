import React, { Component } from 'react';
import Question from './questionTemplate.jsx';
import { Checkbox, Radio, FormGroup, Button } from 'react-bootstrap';

const questionsAndResponses = [
{question: 'Do you own your home?',
response: <input type="checkbocx" />}
]


export default class Qualify extends Component {

  constructor (props) {
    super(props);
    this.changeOwnHome = this.changeOwnHome.bind(this);
    this.sendZillowRequest = this.sendZillowRequest.bind(this);
    this.zipCodeValidation = this.zipCodeValidation.bind(this);
    this.state = {
      ownHome: '',
      streetAddress: '',
      unit: '',
      zipcode: ''
    }
  }

  changeOwnHome (e) {
    this.setState({
      ownHome: e.target.value
    })
  }

  zipCodeValidation () {
    const length = this.state.zipcode.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  sendZillowRequest () {

  }

  
  render() {
    return (
      <div>
      <form>
        <FormGroup>
          <label>Do You Own Your Home?</label>
          <Radio value="Yes" 
            checked={this.state.ownHome === 'Yes'}
            onChange={this.changeOwnHome}>
            Yes
          </Radio>
          <Radio value="No" 
            checked={this.state.ownHome === 'No'}
            onChange={this.changeOwnHome}>
            No
          </Radio>
        </FormGroup>
        <FormGroup>
          Thanks for letting us know - it looks like you could be a great fit for SplitLevel!
          <Question 
            question={'What is the street address of the home you want to list?'} 
            responseType={"text"}
            placeholder={'Street Address'}
            value={this.state.streetAddress}
            id={'street'} />
          <Question 
            question={'Do you have a specific unit number?'} 
            responseType={"text"}
            placeholder={'Unit Number'}
            value={this.state.unit}
            id={'unit'} />
          <Question 
            question={'And the zip code?'} 
            responseType={"text"}
            placeholder={'Zip Code'}
            value={this.state.zipcode}
            id={'zipcode'} 
            validation={this.zipCodeValidation()}/>
        </FormGroup>
        <Button onClick={this.sendZillowRequest}>Get Details About My Home!</Button>
      </form>
      </div>
    )
  }
};