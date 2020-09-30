const { writeFileSync } = require('fs');
const request = require('superagent');

const saveArt = async (req, res) => {
  const { id } = req.session;
  const { md5, name, data } = req.files.image;
  const { tags, title, caption } = req.body;
  const { dataStore } = req.app;
  writeFileSync(`./public/images/${name}`, data);
  const artData = await dataStore.getArtWork();
  artData
    .find((u) => u.id === id)
    .artWorks.unshift({ md5, name, tags: tags.split(' '), title, caption });
  dataStore.setArtWork(artData);
  res.end();
};

const serveArtWork = async (req, res) => {
  const { id } = req.session;
  const { dataStore } = req.app;
  const artData = await dataStore.getArtWork();
  const artWorks = artData.find((u) => {
    return u.id === id;
  });
  res.json(artWorks);
};

const registerNewUser = async (req, res) => {
  const { id, avatar } = req.session;
  const { dataStore } = req.app;
  const artData = await dataStore.getArtWork();
  artData.push({ id, avatar, ...req.body, artWorks: [] });
  dataStore.setArtWork(artData);
  res.end();
};

const handleLogout = (req, res) => {
  req.session = null;
  res.end();
};

const isLoggedIn = async (req, res) => {
  const { id } = req.session;
  const isLoggedIn = id ? true : false;
  const { dataStore } = req.app;
  const artData = await dataStore.getArtWork();
  const user = artData.find((u) => {
    return u.id === id;
  });
  const isRegisteredUser = user ? true : false;
  res.json({ isLoggedIn, isRegisteredUser, id });
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
  res.redirect(`/`);
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
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ClientId}&response_type=code&redirect_uri=${RedirectUri}&scope=https%3A//www.googleapis.com/auth/userinfo.profile`;
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
