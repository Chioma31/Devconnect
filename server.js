const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());rs = require('./routes/api/users');


//DB config 
const db = require('./config/keys').mongoURI;

//Connect to MongoDB 
mongoose 
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello how are are you'));


//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


