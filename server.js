const PORT = 3002;
const express = require('express');
const session = require('cookie-session');
const morgan = require('morgan');
const app = express();

const {
  fetchDetails,
  handleLogin,
  registerNewUser,
  serveAuthUrl,
} = require('./handlers');

const {
  ClientId,
  ClientSecret,
  RedirectUri,
  ReactServer,
  CookieSecret,
} = require('./config.js');

app.locals = { ClientId, ClientSecret, RedirectUri, ReactServer };

app.use(morgan('tiny'));
app.use(express.json());
app.set('sessionMiddleware', session({ secret: CookieSecret }));
app.use((...args) => app.get('sessionMiddleware')(...args));

app.post('/api/register', registerNewUser);

app.get('/auth/user', fetchDetails, handleLogin);
app.get('/auth/init', serveAuthUrl);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
