const axios = require('axios');
const keys = require('./keys');
const xml2js = require('xml2js');

var parseString = require('xml2js').parseString;

module.exports = {
  fetchZillowData: function (req, res) {
     axios.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${keys.zillow_key}&address=74+Lynch+Street&citystatezip=94109`)
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
  
};