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
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log('token:', token);
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
}

// const authenticate = ()

module.exports = {
  createToken,
  authenticate
}