const uuid = require('uuid');
const db = require('../helpers/firebase').firebaseDB;
const Bikes = require('../helpers/firebase').Bikes;
const Users = require('../helpers/firebase').Users;
const firebaseDB = require('../helpers/firebase').firebaseDB;

module.exports = {
  create,
  search,
  getBikesForUser,
  getBikesByIds,
};

function validateBike(bikeObject) {
  let error = null;

  if (!bikeObject.serial.length) {
    error = 'Missing bike serial';
  } else {
    bikeObject.serial = bikeObject.serial.toUpperCase();
  }

  if (!bikeObject.make.length) {
    error = 'Missing bike make';
  }

  return {
    error,
    bikeObject,
  };
}

async function create(req, res) {
  const bikeRequestObject = req.swagger.params.bike.value;
  const bikeValidationResult = validateBike(bikeRequestObject);

  if (bikeValidationResult.error) {
    res.status(400).json(bikeValidationResult);
  }

  const newBikeId = uuid.v4();
  const bikeObject = {
    ...bikeValidationResult.bikeObject,
    id: newBikeId,
  };
  const userRef = Users.doc(req.user.uid);

  // Try fetching bike with the serial number in the request
  try {
    const bikesSnapshot = await Bikes.where(
      'serial',
      '==',
      bikeValidationResult.bikeObject.serial,
    ).get();
    if (!bikesSnapshot.empty) {
      res.status(409).json({
        message: `Bike already registered`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An unknown error has occurred',
    });
  }

  let userSnapshot;

  // Get user information
  try {
    userSnapshot = await userRef.get();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred fetching the user information',
    });
  }

  const bikes = userSnapshot.data().bikes || [];
  const foundBike = bikes.find(bike => bike.serial === bikeValidationResult.bikeObject.serial);

  if (foundBike) {
    res.status(409).json({
      message: 'Bike already exists in user profile',
    });
  }

  // Insert new bike info into Bikes collection
  try {
    const newBikeSnapshot = await Bikes.doc(newBikeId).set(bikeObject);
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while updating the user with then new bike information',
    });
  }
}

async function search(req, res) {
  const serial = req.swagger.params.serial.value
    ? req.swagger.params.serial.value.toUpperCase()
    : null;

  if (!serial) {
    res.status(400).json({
      message: 'Bike serial must be specified',
    });
  }

  let bikesSnapshot;

  try {
    bikesSnapshot = await Bikes.where('serial', '==', serial).get();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An unknown error has occurred',
    });
  }

  const bikes = bikesSnapshot.docs.map(bike => bike.data());

  res.json(bikes);
}

async function getBikesForUser(req, res) {
  const uid = req.user.uid;
  let userSnapspot;

  try {
    userSnapspot = await Users.doc(uid).get();
  } catch (error) {
    res.status(500).json({
      message: 'There was error fetching your bikes',
    });
  }

  const bikeIds = userSnapspot.data().bikes || [];
  const bikes = await fetchBikesDetails(bikeIds);

  res.json(bikes);
}

async function fetchBikesDetails(bikeIds) {
  if (bikeIds.length) {
    let bikeRefs = bikeIds.map(bikeId => Bikes.doc(bikeId));

    try {
      const bikesSnapshot = await firebaseDB.getAll(...bikeRefs);
      const bikes = bikesSnapshot.map(bike => bike.data());
      return bikes;
    } catch (error) {
      console.error(error);
    }
  }

  return [];
}

async function getBikesByIds(req, res) {
  const bikeIdString = req.swagger.params.bikeIds.value || '';
  let bikeIds = bikeIdString.split(',');
  let bikes;

  if (!bikeIds.length) {
    res.status(400).json({
      message: 'Bike Ids not specified',
    });
  }

  try {
    bikes = await fetchBikesDetails(bikeIds);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: error.message,
    });
  }

  if (bikes.length === 1) {
    bikes = bikes[0];
  }

  res.json(bikes);
}
