const db = require('./db.js');

module.exports = {
  getUser: (req, res) => {
    // requires: username
    // returns: firstname, lastname, email
    db.query(`SELECT firstname, lastname, email FROM users WHERE username = \'${req.query.username}\'`)
    .then((results) => res.send(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  addUser: (req, res) => {
    // requires: username, password
    // optional: firstname, lastname, email
    db.query('INSERT INTO ' +
      'users (username, password, firstname, lastname, email) ' +
      `VALUES (\'${req.body.username}\', \'${req.body.password}\', ` +
      `\'${req.body.firstname || ''}\', \'${req.body.lastname || ''}\', \'${req.body.email || ''}\')`)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  deleteUser: (req, res) => {
    // requires: username
    db.query(`DELETE FROM users WHERE username = \'${req.body.username}\'`)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  getProperties: (req, res) => {
    // requires: username
    // returns: address, city, state, country, zip, value, mortgage, term, monthly, invested
    db.query(`SELECT address, city, state, country, zip, value, mortgage, term, monthly, invested ` +
      `FROM properties WHERE owner = (SELECT id FROM users WHERE username = \'${req.query.username}\')`)
    .then((results) => res.send(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  addProperty: (req, res) => {
    // requires: owner
    // optional: address, city, state, country, zip, value, mortgage, term, monthly, invested
    db.query('INSERT INTO ' +
      'properties (owner, address, city, state, country, zip, value, mortgage, term, monthly, invested) ' +
      `VALUES ((SELECT id FROM users WHERE username = \'${req.body.owner}\'), \'${req.body.address || ''}\', \'${req.body.city || ''}\', ` +
      `\'${req.body.state || ''}\', \'${req.body.country || ''}\', ${req.body.zip || 0}, ` +
      `${req.body.value || 0}, ${req.body.mortgage || 0}, ${req.body.term || 0}, ` +
      `${req.body.monthly || 0}, ${req.body.invested || 0})`)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  }
}
