const request = require('superagent');
const database = require('./data.json');

const registerNewUser = function (req, res) {
  const { id, avatar } = req.session;
  const userInfo = { id, avatar, ...req.body };
  console.log({ userInfo, artWork: [] });
  database.push({ userInfo, artWork: [] });
  res.redirect('/gallery');
};

const handleLogin = function (req, res) {
  const { sub, name, picture } = req.userInfo;
  const user = {
    id: sub,
    name,
    avatar: picture,
    sessionCreatedAt: new Date().toJSON(),
  };
  req.session = user;
  res.redirect(req.app.locals.ReactServer);
};

const getToken = (code, credentials) => {
  const { ClientId, ClientSecret, RedirectUri } = credentials;
  return request
    .post('https://www.googleapis.com/oauth2/v4/token')
    .send({
      code,
      ['client_id']: ClientId,
      ['client_secret']: ClientSecret,
      ['redirect_uri']: RedirectUri,
      ['grant_type']: 'authorization_code',
    })
    .set('Accept', 'application/json')
    .then((res) => res.body);
};

const getUserInfo = function ({ token_type, access_token }) {
  return request
    .get(`https://www.googleapis.com/oauth2/v3/userinfo`)
    .set('User-Agent', 'artInAction')
    .set('Authorization', `${token_type} ${access_token}`)
    .then((res) => res.body);
};

const fetchDetails = async (req, res, next) => {
  const code = req.query.code;
  try {
    const token = await getToken(code, req.app.locals);
    req.userInfo = await getUserInfo(token);
    next();
  } catch (err) {
    console.log('err', err);
    return res.send(err);
  }
};

const serveAuthUrl = (req, res) => {
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?client_id=255108424820-8e1p39r9u251c8gagoklt9nb1e8vngoq.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3002/auth/user&scope=https%3A//www.googleapis.com/auth/userinfo.profile';
  res.json({ url });
};

module.exports = { fetchDetails, handleLogin, registerNewUser, serveAuthUrl };
