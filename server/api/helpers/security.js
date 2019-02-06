module.exports = {
  apiKeyAuth,
  accessTokenAuth,
};

function apiKeyAuth(req, res, next) {
  const headerToValidate = 'x-api-key';

  if (req.headers[headerToValidate]) {
    const apiKey = req.headers[headerToValidate];
    let API_KEY;

    switch (process.env.NODE_ENV) {
      case 'dev':
        API_KEY = 'XXX';
        break;
      case 'prod':
        API_KEY = 'XXX';
        break;
      default:
        API_KEY = process.env.API_KEY;
        break;
    }

    if (apiKey === API_KEY) {
      next();
    } else {
      res.status(401).send('Invalid Api Key');
    }
  } else {
    res.status(401).send('Api Key not found');
  }
}

function accessTokenAuth(req, res, next) {
  const headerToValidate = 'x-access-token';

  if (req.headers[headerToValidate]) {
    const accessToken = req.headers[headerToValidate];
    let API_KEY;

    if (accessToken) {
      console.log(`Access token: ${accessToken}`);
      next();
    } else {
      res.status(401).send('Invalid Access Token');
    }
  } else {
    res.status(401).send('Access Token not found');
  }
}