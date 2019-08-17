const { Client } = require('pg');
const connectionString = 'postgres://luyvvschjoiarj:ce90f5f63ce57beabbea3de06d2d630ffb0f2ce0f7f7fb259fed64f1698d1382@ec2-174-129-240-67.compute-1.amazonaws.com:5432/d9bgnmcnnqio2p';
// 'postgres://postgres:postgres@localhost:5432/contact_app'
// 'postgres://luyvvschjoiarj:ce90f5f63ce57beabbea3de06d2d630ffb0f2ce0f7f7fb259fed64f1698d1382@ec2-174-129-240-67.compute-1.amazonaws.com:5432/d9bgnmcnnqio2p'
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
