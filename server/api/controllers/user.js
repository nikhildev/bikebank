const uuid = require('uuid');
const db = require('../helpers/firebase').firebaseDB;
const Users = require('../helpers/firebase').Users;
const firebaseDB = require('../helpers/firebase').firebaseDB;

module.exports = {
  ping,
};

async function ping(req, res) {
  let error = null;

  const userRef = Users.doc(req.user.uid);

  try {
    userSnapshot = await userRef.get();

    console.log('userSnapshot', userSnapshot.data());
  } catch (error) {
    console.error(error);
  }

  res.json({
    error: 0,
    message: 'success',
  });
}
