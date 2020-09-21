const PORT = 3002;
const express = require('express');
const morgan = require('morgan');
const app = express();

const { fetchDetails } = require('./handlers');
const { ClientId, ClientSecret, RedirectUri } = require('./config.js');
app.locals = { ClientId, ClientSecret, RedirectUri };

app.use(morgan('tiny'));
app.use(express.json());

app.get('/auth/user', fetchDetails);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
