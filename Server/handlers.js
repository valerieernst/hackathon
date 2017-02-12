const axios = require('axios');
const keys = require('./keys');
const xml2js = require('xml2js');
const amortize = require('amortize');
const parseString = require('xml2js').parseString;


module.exports = {

  // this returns an object that includes historical prices and last sales date
  getZillowHistoricalData(req, res) {
    const streetAddress = req.body.streetAddress || '74+Lynch+Street';
    const zipCode = req.body.zipCode;

    axios.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${keys.zillow_key}&address=${streetAddress}&citystatezip=${zipCode}`)
      .then((results) => {
        parseString(results.data, { explicitArray: false }, (err, result) => {
          const cleanZillowResponse = result['SearchResults:searchresults'].response.results.result;
          res.send(cleanZillowResponse);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

// this returns an object that includes pictures
  getZillowPropertyData(req, res) {
    const zpid = req.body.zpid;

    axios.get(`http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${keys.zillow_key}&zpid=${zpid}`)
      .then((results) => {
        parseString(results.data, { explicitArray: false }, (err, result) => {
          const cleanZillowResponse = result['UpdatedPropertyDetails:updatedPropertyDetails'].response;
          res.send(cleanZillowResponse);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

// this returns the price appreciation of a property
  getPriceAppreciation(req, res) {
    const lastSoldPrice = req.body.lastSoldPrice;
    const zestimate = req.body.zestimate;

    const priceAppreciation = zestimate / lastSoldPrice - 1;
    res.send(priceAppreciation.toString());
  },


  //this returns the monthly payment and breakdown by interest and principal (not including tax)
  getMonthlyLoanPaymentDetails: function (req, res) {

    let existingMonthlyPayment = req.body.existingMonthlyPayment;
    let lastSoldDate = req.body.lastSoldDate;
    let originalLoanAmount = req.body.lastSoldPrice['_'] - req.body.downPayment;
    let term = req.body.term;
    let interestRate = req.body.interestRate;

    const monthsSincePurchase = Math.floor((new Date() - new Date(lastSoldDate)) / (1000 * 60 * 60 * 24 * 30));

    // npm module that return loan details
    const monthlyLoanPaymentDetails =
     amortize({
      amount: originalLoanAmount,
      rate: interestRate * 100,
      totalTerm: term,
      amortizeTerm: monthsSincePurchase
    });

    let monthlyLoanPaymentDetailsNextMonth = 
     amortize({
      amount: originalLoanAmount,
      rate: interestRate * 100,
      totalTerm: term,
      amortizeTerm: monthsSincePurchase+1
    });

    let existingAndNewMonthlyPayment = {};

    existingAndNewMonthlyPayment.existingPayment = existingMonthlyPayment;
    existingAndNewMonthlyPayment.newPayment = existingMonthlyPayment - (monthlyLoanPaymentDetails.balance-monthlyLoanPaymentDetailsNextMonth.balance);

    res.send(existingAndNewMonthlyPayment);
  },
  getProperties(req, res) {
    res.send(dummyHomes);
  },

};

const dummyHomes = [{
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  image: 'house.png',
  monthly: '1,000',
  discount: '15%',
  value: '1,000,000',
  id: 1,
  total: 30,
  term: 6,
}, {
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  image: 'house.png',
  monthly: '1,000',
  discount: '15%',
  value: '1,000,000',
  id: 2,
  total: 30,
  term: 6,
}, {
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  image: 'house.png',
  monthly: '1,000',
  discount: '15%',
  value: '1,000,000',
  id: 3,
  total: 30,
  term: 6,
}];
