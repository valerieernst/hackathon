const db = require('./db.js');

module.exports = {
  getUser: (req, res) => {
    // requires: username
    // returns: firstname, lastname, email
    db.query(`SELECT firstname, lastname, email FROM users WHERE username = \'${req.query.username}\'`)
    .then(results => res.send(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  postUser: (req, res) => {
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
    // requires: owner (username)
    // returns: address, city, state, country, zip, value, mortgage, term, monthly, invested
    db.query(`SELECT address, city, state, country, zip, value, mortgage, term, monthly, invested ` +
      `FROM properties WHERE owner = (SELECT id FROM users WHERE username = \'${req.query.owner}\')`)
    .then(results => res.send(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  postProperty: (req, res) => {
    // requires: owner (username)
    // optional: address, city, state, country, zip, value, mortgage, term, monthly, invested
    db.query('INSERT INTO ' +
      'properties (owner, address, city, state, country, zip, value, mortgage, term, monthly, invested) ' +
      `VALUES ((SELECT id FROM users WHERE username = \'${req.body.owner}\'), ` +
      `\'${req.body.address || ''}\', \'${req.body.city || ''}\', ` +
      `\'${req.body.state || ''}\', \'${req.body.country || ''}\', ` +
      `${req.body.zip || 0}, ${req.body.value || 0}, ` +
      `${req.body.mortgage || 0}, ${req.body.term || 0}, ` +
      `${req.body.monthly || 0}, ${req.body.invested || 0})`)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  deleteProperty: (req, res) => {
    // requires: address
    db.query(`DELETE FROM properties WHERE address = \'${req.body.address}\'`)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  getInvestments: (req, res) => {
    // requires: investor (username)
    // returns: address, value, return, term, monthly
    db.query(`SELECT p.address, i.value, i.return, i.term, i.monthly ` +
      `FROM properties as p JOIN investments as i ON p.id = i.property ` +
      `WHERE investor = (SELECT id FROM users WHERE username = \'${req.query.investor}\')`)
    .then(results => res.send(results))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  postInvestment: (req, res) => {
    // requires: investor (username), property (address)
    // optional: value, return, term, monthly
    db.query('INSERT INTO ' +
      'investments (investor, property, value, return, term, monthly) ' +
      `VALUES ((SELECT id FROM users WHERE username = \'${req.body.investor}\'), ` +
      `(SELECT id FROM properties WHERE address = \'${req.body.property}\'), ` +
      `${req.body.value || 0}, ${req.body.return || 0}, ` +
      `${req.body.term || 0}, ${req.body.monthly || 0})`)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  },
  deleteInvestment: (req, res) => {
    // requires: investor (username), property (address)
    db.query(`DELETE FROM investments WHERE ` +
      `investor = (SELECT id FROM users WHERE username = \'${req.body.investor}\') AND ` +
      `property = (SELECT id FROM properties WHERE address = \'${req.body.property}\')`)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  }
}
