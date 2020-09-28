const express = require('express');
const session = require('cookie-session');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const { createClient } = require('./redisClient');
const { DataStore } = require('./dataStore');

const {
  fetchDetails,
  handleLogin,
  registerNewUser,
  serveAuthUrl,
  serveArtWork,
  isLoggedIn,
  saveArt,
  handleLogout,
} = require('./handlers');

const {
  ClientId,
  ClientSecret,
  RedirectUri,
  ReactServer,
  CookieSecret,
} = require('../config.js');

const app = express();

const dataStore = new DataStore(createClient());
app.locals = { ClientId, ClientSecret, RedirectUri, ReactServer };
app.dataStore = dataStore;

app.use(morgan('tiny'));
app.use(express.json());
app.use(fileUpload());
app.use('/api/images', express.static('public/images'));
app.set('sessionMiddleware', session({ secret: CookieSecret }));
app.use((...args) => app.get('sessionMiddleware')(...args));

app.post('/api/register', registerNewUser);
app.post('/api/saveArt', saveArt);

app.get('/api/artWork', serveArtWork);

app.get('/api/logout', handleLogout);
app.get('/api/isLoggedIn', isLoggedIn);
app.get('/auth/user', fetchDetails, handleLogin);
app.get('/auth/init', serveAuthUrl);

module.exports = { app };
