const query = require('../models');
const { createToken } = require('../authentication');

const userLogin = (req, res) => {
  const { userID: user_id, email, name: username, picture:{ data: avatar} } = req.body;
  const text = 'INSERT INTO users (user_id, email, username, avatar) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO NOTHING';
  const params = [ user_id, email, username, avatar];
  return query(text, params)
    .then(response => {
      req.session.user = user_id; 
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: createToken(user_id),
        data: { id: user_id, email, username, avatar }
      });
    }).catch(err => {
      throw(err) 
    })
}

const getUser = (req, res) => {
  const id = req.params.id;
  const text = 'SELECT * FROM users WHERE user_id = $1';
  const params = [id];
  return query(text, params)
    .then(result => {
      const user = result.rows[0]
      user.id = user.user_id;
      res.json({
        success: true,
        data: user,
      });
    })
    .catch(err => {
      throw(err);
    });
}

module.exports = {
  userLogin,
  getUser
}