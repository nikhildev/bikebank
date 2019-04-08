const firebaseAdmin = require('firebase-admin');

///--- Firebase Initialization ---///
let serviceAccount;

try {
  serviceAccount = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key.replace(/\\n/g, '\n'),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  };

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
} catch (error) {
  switch (error.code) {
    case 'MODULE_NOT_FOUND':
      throw new Error('### FIREBASE CONFIG FILE NOT FOUND ###');
      break;
    default:
      console.error(error);
      throw new Error('### An unknown error has occurred with initialization ###');
  }
}

const firebaseDB = firebaseAdmin.firestore();
const Bikes = firebaseDB.collection('Bikes');
const Users = firebaseDB.collection('Users');

///--- End of Firebase Initialization ---///

module.exports = {
  firebaseAdmin,
  firebaseDB,
  Bikes,
  Users,
};
