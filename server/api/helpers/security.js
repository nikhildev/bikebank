// import { firebaseAdmin } from './firebase';
const firebaseAdmin = require('./firebase').firebaseAdmin;

module.exports = {
  accessTokenAuth,
};

function accessTokenAuth(req, res, next) {
  const headerToValidate = 'x-id-token';

  if (req.headers[headerToValidate]) {
    const idToken = req.headers[headerToValidate];

    firebaseAdmin.auth().verifyIdToken(idToken).then(decodedToken => {
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