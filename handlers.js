const request = require('superagent');

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
    .set('User-Agent', 'googleauthlogin')
    .set('Authorization', `${token_type} ${access_token}`)
    .then((res) => res.body);
};

const fetchDetails = async (req, res) => {
  const code = req.query.code;
  try {
    const token = await getToken(code, req.app.locals);
    const userInfo = await getUserInfo(token);
    res.end();
  } catch (err) {
    return res.send(err);
  }
};

module.exports = { fetchDetails };
