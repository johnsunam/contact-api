const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign({user: user},
    process.env.SECRET,
    {
      expiresIn: '24h'
    }
  );
  return token;
}

const authenticate = (req, res, next) => {
  let token = req.headers['authorization'];
  if(token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(302).json({
          success: false,
          message: '/login',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(302).json({
      success: false,
      message: '/login',
    });
  }
}

// const authenticate = ()

module.exports = {
  createToken,
  authenticate
}