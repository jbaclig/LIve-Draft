const express = require('express');
const app = express();
const auth = require('./routes/auth');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => res.send('App is working'));

app.use('/auth', auth);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;