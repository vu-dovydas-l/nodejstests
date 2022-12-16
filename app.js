const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/routes');
const config = require('./config/config')
const facebookLogin = require('./API/facebookLogin');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});