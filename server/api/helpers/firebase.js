const firebaseAdmin = require('firebase-admin');

///--- Firebase Initialization ---///
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

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const firebaseDB = firebaseAdmin.firestore();

const Bikes = firebaseDB.collection('Bikes');
const Users = firebaseDB.collection('Users');

///--- End of Firebase Initialization ---///

module.exports = {
  firebaseAdmin,
  firebaseDB,
  Bikes,
  Users,
}


