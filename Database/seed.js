const db = require('./db.js');

db.query('DROP TABLE investments;').catch((err) => console.error(err))
.then(() => db.query('DROP TABLE properties;')).catch((err) => console.error(err))
.then(() => db.query('DROP TABLE users;')).catch((err) => console.error(err))
.then(() => db.query('CREATE TABLE users(' +
  'id SERIAL NOT NULL PRIMARY KEY, ' +
  'username TEXT NOT NULL, ' +
  'password TEXT NOT NULL, ' +
  'firstname TEXT, ' +
  'lastname TEXT, ' +
  'phone TEXT, ' +
  'email TEXT' +
');'))
.then(() => db.query('CREATE TABLE properties(' +
  'id SERIAL NOT NULL PRIMARY KEY, ' +
  'owner SERIAL NOT NULL REFERENCES users(id), ' +
  'address TEXT, ' +
  'city TEXT, ' +
  'state TEXT, ' +
  'country TEXT, ' +
  'zip INT, ' +
  'value INT, ' +
  'mortgage INT, ' +
  'term SMALLINT, ' +
  'monthly SMALLINT, ' +
  'invested INT' +
');'))
.then(() => db.query('CREATE TABLE investments(' +
  'id SERIAL NOT NULL PRIMARY KEY, ' +
  'investor SERIAL NOT NULL REFERENCES users(id), ' +
  'property SERIAL NOT NULL REFERENCES properties(id), ' +
  'value INT, ' +
  'return SMALLINT, ' +
  'term SMALLINT, ' +
  'monthly SMALLINT' +
');'))
.then(() => console.log('the seed has been sown!'))
.catch((err) => console.error(err));
