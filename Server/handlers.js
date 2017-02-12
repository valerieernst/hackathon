const axios = require('axios');
const keys = require('./keys');
const xml2js = require('xml2js');
const amortize = require('amortize');
var parseString = require('xml2js').parseString;


module.exports = {

  //this returns an object that includes historical prices and last sales date
  getZillowHistoricalData: function (req, res) {

    let streetAddress = req.body.streetAddress || "74+Lynch+Street";
    let zipCode = req.body.zipCode;

     axios.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${keys.zillow_key}&address=${streetAddress}&citystatezip=${zipCode}`)
      .then( (results) => {
        parseString(results.data, {explicitArray: false}, function (err, result) {
            let cleanZillowResponse =  result['SearchResults:searchresults']['response'].results.result;
            res.send(cleanZillowResponse);
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  },

//this returns an object that includes pictures
  getZillowPropertyData: function (req, res) {
    let zpid = req.body.zpid;

    axios.get(`http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${keys.zillow_key}&zpid=${zpid}`)
      .then( (results) => {
        parseString(results.data, {explicitArray: false}, function (err, result) {
            let cleanZillowResponse =  result['UpdatedPropertyDetails:updatedPropertyDetails']['response'];
            res.send(cleanZillowResponse);
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  },

//this returns the price appreciation of a property
 getPriceAppreciation: function (req, res) {
    let lastSoldPrice =  req.body.lastSoldPrice;
    let zestimate = req.body.zestimate;

    let priceAppreciation = zestimate / lastSoldPrice - 1;
    res.send( priceAppreciation.toString() );
  },

  //this returns the monthly payment and breakdown by interest and principal (not including tax)
  getMonthlyLoanPaymentDetails: function (req, res) {

    let existingMonthlyPayment = req.body.existingMonthlyPayment;
    let lastSoldDate = req.body.lastSoldDate;
    let originalLoanAmount = req.body.lastSoldPrice['_'] - req.body.downPayment;
    let term = req.body.term;
    let interestRate = req.body.interetRate;

     let monthsSincePurchase = Math.floor( (new Date() - new Date(lastSoldDate) ) / (1000 * 60 * 60 * 24 * 30) ) ;

    //npm module that return loan details
    let monthlyLoanPaymentDetails = 
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
  }  
};