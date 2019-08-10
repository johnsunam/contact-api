const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/contact_app';

const db = new Client({
  connectionString: connectionString,
})

db.connect(err => {
  if (err) throw err;
  else {
    console.log('database connected')
  }
})

module.exports = db;
