const admin = require('firebase-admin');

let serviceAccount;

try {
  serviceAccount = require('../../config/firebase-service-config.json');
} catch(error) {
  switch (error.code) {
    case 'MODULE_NOT_FOUND':
      throw new Error('### FIREBASE CONFIG FILE NOT FOUND ###');
      break;
    default:
      throw new Error('### An unknown error has occurred ###');
  }
}

module.exports = {
  apiKeyAuth,
  accessTokenAuth,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
  const headerToValidate = 'x-id-token';

  if (req.headers[headerToValidate]) {
    const idToken = req.headers[headerToValidate];

    admin.auth().verifyIdToken(idToken).then(decodedToken => {
      req.user = {
        uid: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
      }
      next();
    }).catch(error => {
      console.error(error);
      res.status(401).send('Invalid Access Token');
    });
  } else {
    res.status(401).send('Access Token not found');
  }
}