const db = require('./db.js');

module.exports = {
  addUser: (req, res) => {
    // requires: username, password
    // optional: firstname, lastname, email
    db.query('INSERT INTO ' +
      'users (username, password, firstname, lastname, email) ' +
      `VALUES (\'${req.body.username}\', \'${req.body.password}\', ` +
      `\'${req.body.firstname || ''}\', \'${req.body.lastname || ''}\', \'${req.body.email || ''}\');`)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  }
}
