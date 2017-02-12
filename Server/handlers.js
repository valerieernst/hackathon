const axios = require('axios');
const xml2js = require('xml2js');
const amortize = require('amortize');
const parseString = require('xml2js').parseString;


module.exports = {

  // this returns an object that includes historical prices and last sales date
  getZillowHistoricalData(req, res) {
    const streetAddress = req.body.streetAddress || '74+Lynch+Street';
    const zipCode = req.body.zipCode;

    axios.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${process.env.ZILLOW_KEY}&address=${streetAddress}&citystatezip=${zipCode}`)
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


  // this returns the monthly payment and breakdown by interest and principal (not including tax)
  getMonthlyLoanPaymentDetails(req, res) {
    const existingMonthlyPayment = req.body.existingMonthlyPayment;
    const lastSoldDate = req.body.lastSoldDate;
    const originalLoanAmount = req.body.originalLoanAmount;
    const term = req.body.term;
    const interestRate = req.body.interestRate;

    const monthsSincePurchase = Math.floor((new Date() - new Date(lastSoldDate)) / (1000 * 60 * 60 * 24 * 30));

    // npm module that return loan details
    const monthlyLoanPaymentDetails =
     amortize({
       amount: originalLoanAmount,
       rate: interestRate,
       totalTerm: term,
       amortizeTerm: monthsSincePurchase,
     });

    const monthlyLoanPaymentDetailsNextMonth =
     amortize({
       amount: originalLoanAmount,
       rate: interestRate,
       totalTerm: term,
       amortizeTerm: monthsSincePurchase + 1,
     });

    const existingAndNewMonthlyPayment = {};

    existingAndNewMonthlyPayment.existingPayment = existingMonthlyPayment;
    existingAndNewMonthlyPayment.newPayment = existingMonthlyPayment - (monthlyLoanPaymentDetails.balance - monthlyLoanPaymentDetailsNextMonth.balance);

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
  state: 'CA',
  image: 'house.png',
  monthly: 1000,
  discount: 15,
  value: 1000000,
  id: 1,
  total: 30,
  term: 6,
}, {
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  state: 'CA',
  image: 'house.png',
  monthly: 1000,
  discount: 15,
  value: 500000,
  id: 2,
  total: 30,
  term: 12,
}, {
  owner: 'XYZ',
  zipcode: '94100',
  city: 'San Francisco',
  state: 'CA',
  image: 'house.png',
  monthly: 1000,
  discount: 15,
  value: 1500000,
  id: 3,
  total: 30,
  term: 18,
}];
