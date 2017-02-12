import React, { Component } from 'react';
import Question from './questionTemplate.jsx';
import { Checkbox, Radio, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import Modal from './verifyModal.jsx';


export default class Qualify extends Component {

  constructor (props) {
    super(props);
    this.changeOwnHome = this.changeOwnHome.bind(this);
    this.sendZillowRequest = this.sendZillowRequest.bind(this);
    this.zipCodeValidation = this.zipCodeValidation.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.closeModal= this.closeModal.bind(this);
    this.submitResults = this.submitResults.bind(this);

    this.state = {
      ownHome: '',
      streetAddress: '',
      unit: '',
      zipcode: '',
      zillowReqSent: false,
      monthlyPayment: 0,
      interestRate: 0,
      downPayment: 0,
      term: 0,
      homeImage: '',
      modalOpen: false
    }
  }

  changeOwnHome (e) {
    this.setState({
      ownHome: e.target.value
    })
  }

  changeHandler (e) {
    const key = e.target.id
    this.setState({
      [key]: e.target.value
    })
  }


  zipCodeValidation () {
    const length = this.state.zipcode.length;
    if (length === 5) return 'success';
    else if (length > 5) return 'warning';
    else if (length < 5) return 'error';
  }

  sendZillowRequest () {
    this.setState({zillowReqSent: true})
    this.setState({modalOpen: true})

    const streetAddressForReq = this.state.streetAddress.replace(' ', '+');
    axios.post('/getZillowData', {
      street: streetAddressForReq,
      unit: this.state.unit,
      zipcode: this.state.zipcode
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  closeModal () {
    this.setState({modalOpen: false})
  }

  submitResults () {
    console.log(this.state);
  }

  
  render() {
    return (
      <div className='container'>
      <form>
        <FormGroup>
          <label>Do You Own Your Home?</label>
          <Radio value="Yes" 
            id="ownHome"
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
        {this.state.ownHome === 'Yes' && !this.state.zillowReqSent ? 
          <div>
            <FormGroup>
              <h2>Thanks for letting us know - it looks like you could be a great fit for SplitLevel!</h2>
              <Question 
                question={'What is the street address of the home you want to list?'} 
                responseType={"text"}
                placeholder={'Street Address'}
                value={this.state.streetAddress}
                id={'streetAddress'} 
                onChange={this.changeHandler}/>
              <Question 
                question={'Do you have a specific unit number?'} 
                responseType={"text"}
                placeholder={'Unit Number'}
                value={this.state.unit}
                id={'unit'} 
                onChange={this.changeHandler}/>
              <Question 
                question={'And the zip code?'} 
                responseType={"text"}
                placeholder={'Zip Code'}
                value={this.state.zipcode}
                id={'zipcode'} 
                onChange={this.changeHandler}
                validation={this.zipCodeValidation()}/>
            </FormGroup>
            <Button onClick={this.sendZillowRequest}>Get Details About My Home!</Button> 
          </div>
        : null }
      </form>
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} contentLabel={"Verify Modal"} image={this.state.homeImage}/>
      {this.state.zillowReqSent ? 
      <form>
        <FormGroup>
          <h2>Great! Now just a few more questions so we can figure out how much lower your monthly payment could be:</h2>
            <Question 
              question={'What was your monthly payment last month?'} 
              responseType={"text"}
              placeholder={'Monthly Payment'}
              value={this.state.monthlyPayment}
              id={'monthlyPayment'} 
              onChange={this.changeHandler}/>
            <Question 
              question={'What is your current interest rate?'} 
              responseType={"text"}
              placeholder={'interestRate'}
              value={this.state.interestRate}
              id={'interestRate'} 
              onChange={this.changeHandler}/>
            <Question 
              question={'What is the term of your mortgage (in years)?'} 
              responseType={"text"}
              placeholder={'Mortgage Term (in years)'}
              value={this.state.term}
              id={'term'} 
              onChange={this.changeHandler}/>
            <Question 
              question={'How much did you put down on the home?'} 
              responseType={"text"}
              placeholder={'Down Payment'}
              value={this.state.downPayment}
              id={'downPayment'} 
              onChange={this.changeHandler}/>
        </FormGroup>
        <Button onClick={this.submitResults}>See My Options!</Button>
      </form>
      : null }
      </div>
    )
  }
};