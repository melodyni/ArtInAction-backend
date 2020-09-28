const { writeFileSync } = require('fs');
const request = require('superagent');
const database = require('../data.json');

const saveArt = (req, res) => {
  const { id } = req.session;
  const { md5, name, data } = req.files.image;
  const { tags, title, caption } = req.body;
  writeFileSync(`./public/images/${name}`, data);
  database
    .find((u) => u.id === id)
    .artWorks.unshift({ md5, name, tags: tags.split(' '), title, caption });
  console.log(database);
  res.end();
};

const serveArtWork = (req, res) => {
  const { id } = req.session;
  const artWorks = database.find((u) => {
    return u.id === id;
  });
  res.json(artWorks);
};

const handleLogout = (req, res) => {
  req.session = null;
  res.end();
};

const registerNewUser = (req, res) => {
  const { id, avatar } = req.session;
  database.push({ id, avatar, ...req.body, artWorks: [] });
  res.end();
};

const isLoggedIn = (req, res) => {
  const { id } = req.session;
  const isLoggedIn = id ? true : false;
  res.json({ isLoggedIn, id });
};

const handleLogin = (req, res) => {
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

const getUserInfo = ({ token_type, access_token }) => {
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
    return res.send(err);
  }
};

const serveAuthUrl = (req, res) => {
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?client_id=255108424820-8e1p39r9u251c8gagoklt9nb1e8vngoq.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3002/auth/user&scope=https%3A//www.googleapis.com/auth/userinfo.profile';
  res.json({ url });
};

module.exports = {
  fetchDetails,
  handleLogin,
  registerNewUser,
  serveAuthUrl,
  serveArtWork,
  isLoggedIn,
  saveArt,
  handleLogout,
};
