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
    const userSnapshot = await userRef.get();

    // If user does not exist(never logged in before), we create a new profile for it
    if (!userSnapshot.exists) {
      const newUserObject = {
        uid: req.user.uid,
        bikes: [],
        lastLogin: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
      };

      try {
        const newUserSnapshot = await Users.doc(req.user.uid).set(newUserObject);
        console.log('CREATE_USER: ', newUserSnapshot);
        if (newUserSnapshot) {
          res.json(newUserObject);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: 500,
          message: 'Error creating new user',
        });
      }
    }

    const userData = userSnapshot.data();

    try {
      const updateUserSnapshot = await Users.doc(req.user.uid).set({
        ...userData,
        lastLogin: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
      });
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: 'Error updating user login information',
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      error: 500,
      message: 'Error fetching user',
    });
  }
}
