const db = require('../Database/handler');

module.exports = app => {

  app.post('/db/user', db.addUser);
  app.delete('/db/user', db.deleteUser);
  app.post('/db/property', db.addProperty);

}
