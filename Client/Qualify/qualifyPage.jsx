import React, { Component } from 'react';
import Question from './questionTemplate.jsx';
import { Checkbox, Radio, FormGroup, Button, Well } from 'react-bootstrap';
import axios from 'axios';
import VerifyModal from './verifyModal.jsx';
import NewPaymentModal from './newPaymentModal.jsx'


export default class Qualify extends Component {

  constructor (props) {
    super(props);
    this.changeOwnHome = this.changeOwnHome.bind(this);
    this.sendZillowRequest = this.sendZillowRequest.bind(this);
    this.zipCodeValidation = this.zipCodeValidation.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.closeModal= this.closeModal.bind(this);
    this.submitResults = this.submitResults.bind(this);
    this.verifyHome = this.verifyHome.bind(this);
    this.changeHelpTerm = this.changeHelpTerm.bind(this);
    this.submitHome = this.submitHome.bind(this);

    this.state = {
      ownHome: '',
      streetAddress: '',
      unit: '',
      zipcode: '',
      homeVerifed: false,
      purchasePrice: 0,
      monthlyPayment: '',
      interestRate: '',
      downPayment: '',
      term: '',
      lastSoldDate: '',
      zpid: '',
      homeImage: '',
      verifyModalOpen: false,
      newPaymentModalOpen: false,
      newPayment: 0,
      helpTerm: '18',
      savings: 0
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
    const streetAddressForReq = this.state.streetAddress.replace(' ', '+');
    axios.post('/getZillowHistoricalData', {
      streetAddress: streetAddressForReq,
      unit: this.state.unit,
      zipCode: this.state.zipcode
    })
    .then((result) => {
      this.setState({
        zpid: result.data.zpid,
        purchasePrice:result.data.lastSoldPrice._,
        lastSoldDate: result.data.lastSoldDate
      });
      this.getImage();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getImage () {
    axios.post('/getZillowPropertyData', {
      zpid: this.state.zpid
    })
    .then((result) => {
      const image = result.data.images.image.url[0];
      this.setState({
        homeImage: image,
        verifyModalOpen: true,
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  closeModal (modal) {
    this.setState({[modal]: false})
  }

  verifyHome () {
    this.setState({
      homeVerifed: true,
      verifyModalOpen: false
    })
  }

  submitResults () {
    let originalLoanAmount = this.state.purchasePrice - this.state.downPayment;
    axios.post('getMonthlyLoanPaymentDetails', {
      lastSoldDate: this.state.lastSoldDate,
      term: this.state.term,
      interestRate: this.state.interestRate,
      originalLoanAmount: originalLoanAmount,
      existingMonthlyPayment: this.state.monthlyPayment
    })
    .then((result) => {
      this.setState({
        newPayment: result.data.newPayment.toFixed(0),
        newPaymentModalOpen: true,
        savings: ((this.state.monthlyPayment - this.state.newPayment) * this.state.helpTerm).toFixed(0)
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  changeHelpTerm (e) {
    const savings = (this.state.monthlyPayment - this.state.newPayment) * e.target.value
    
    this.setState({
      helpTerm: e.target.value,
      savings: savings.toFixed(0)
    })
  }

  submitHome () {
    //insert into database
    console.log(this.props.history)
  }

  
  render() {
    return (
      <div className='container'>
      <Well>
        <form>
        {!this.state.homeVerifed ?
          <FormGroup>
            <h2>Do You Own Your Home?</h2>
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
          : null }

          {this.state.ownHome === 'Yes' && !this.state.homeVerifed ? 
            <div>
              <FormGroup>
                <h2>Thanks for letting us know - it looks like you could be a great fit for SplitLevel!</h2>
                <h3>We need a few details about your home to make sure we can give you the most accurate estimate.</h3>
                <Question 
                  question={'What is the street address of the home you want to list?'} 
                  responseType={"text"}
                  placeholder={'Street Address'}
                  value={this.state.streetAddress}
                  id={'streetAddress'} 
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

        <VerifyModal 
          isOpen={this.state.verifyModalOpen} 
          notRightHome={() => this.closeModal('verifyModalOpen')} 
          address={this.state.streetAddress} 
          zipcode={this.state.zipcode}
          verifyHome={this.verifyHome}
          image={this.state.homeImage}/>

        {this.state.homeVerifed ? 
        <form>
          <FormGroup>
            <h2>Now just a few more questions to figure out how much lower your monthly payment could be:</h2>
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
                placeholder={'Interest Rate (eg. 2.99)'}
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

        <NewPaymentModal 
          isOpen={this.state.newPaymentModalOpen} 
          declinSignUp={() => this.closeModal('newPaymentModalOpen')} 
          oldMonthlyPayment={this.state.monthlyPayment}
          newMonthlyPayment={this.state.newPayment} 
          changeHelpTerm={this.changeHelpTerm}
          helpTerm={this.state.helpTerm}
          totalSavings={this.state.savings}
          monthlySavings={(this.state.monthlyPayment - this.state.newPayment).toFixed(0)}
          signUp={this.submitHome} />
        </Well>
      </div>
    )
  }
};