const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');


dotenv.config();
const db = require('./connection');
const UserController = require('./controllers/user');
const { authenticate } = require('./authentication');
const app = express();
const port = 3002;



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors())
app.use(session({
  secret: 'abcd',
  resave: false,
  saveUninitialized: false,
}));
app.get('/', (req, res) => {
  res.json({info: 'Node.js, express.js and postgres api'});
});

app.post('/login', UserController.userLogin);
app.get('/user/:id', authenticate, UserController.getUser);
app.get('/logout', (req, res) => {
  req.logout();
  res.send('logout success');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});