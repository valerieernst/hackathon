const db = require('../Database/handler');

module.exports = app => {

  app.get('/db/user', db.getUser);
  app.post('/db/user', db.postUser);
  app.delete('/db/user', db.deleteUser);
  app.get('/db/property', db.getProperties);
  app.post('/db/property', db.postProperty);
  app.delete('/db/property', db.deleteProperty);
  app.get('/db/investment', db.getInvestments);
  app.post('/db/investment', db.postInvestment);
  app.delete('/db/investment', db.deleteInvestment);

}
