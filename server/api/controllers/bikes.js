const uuid = require('uuid');
const db = require('../helpers/firebase').firebaseDB;
const Bikes = require('../helpers/firebase').Bikes;
const Users = require('../helpers/firebase').Users;
const firebaseDB = require('../helpers/firebase').firebaseDB;

module.exports = {
  createBike
};

function validateBike(bikeObject) {
  let error;
  if (!bikeObject.serial.length) {
    error = 'Missing bike serial'
  }

  if (!bikeObject.make.length) {
    error = 'Missing bike make'
  }

  return {
    error,
  };
}

async function createBike(req, res) {
  const bikeRequestObject = req.swagger.params.bike.value;
  const bikeValidationResult = validateBike(bikeRequestObject);

  if (bikeValidationResult.error) {
    res.status(400).json(bikeValidationResult);
  }

  const newBikeId = uuid.v4();
  const bikeObject = {
    ...bikeRequestObject,
    id: newBikeId,
  };
  const userRef = Users.doc(req.user.uid);

  // Try fetching bike with the serial number in the request
  try {
    const bikesSnapshot = await Bikes.where('serial', '==', bikeRequestObject.serial).get();
    if (!bikesSnapshot.empty) {
      res.status(409).json({
        message: `Bike already registered`,
      });
    }
  } catch {
    res.status(500).json({
      message: 'An unknown error has occurred',
    })
  }

  let userSnapshot;

  // Get user information
  try {
    userSnapshot = await userRef.get();
  } catch {
    res.status(500).json({
      message: 'An error occurred fetching the user information',
    });
  }

  const bikes = userSnapshot.data().bikes || [];
  const filteredBikes = bikes.filter(bike => bike.serial === bikeRequestObject.serial);

  if (filteredBikes.length) {
    res.status(409).json({
      message: 'Bike already exists in user profile',
    });
  }

  // Insert new bike info into Bikes collection
  try {
    const newBikeSnapshot = await Bikes.doc(newBikeId).set(bikeObject);
  } catch {
    res.status(500).json({
      message: 'An error occurred while saving the new bike information',
    });
  }

  bikes.push(newBikeId);

  // Update user document with newly created bike id
  try {
    const userUpdateSnapshot = await userRef.update({
      bikes,
    });
    console.log(`CREATED_BIKE ${JSON.stringify(bikeObject)}`);
    res.json(bikeObject);
  } catch(error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while updating the user with then new bike information',
    });
  }

}
