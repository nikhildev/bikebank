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

function createBike(req, res) {
  const bikeRequestObject = req.swagger.params.bike.value;
  const bikeValidationResult = validateBike(bikeRequestObject);

  if (bikeValidationResult.error) {
    res.status(400).json(bikeValidationResult);
  } else {
    const newBikeId = uuid.v4();
    const bikeObject = {
      ...bikeRequestObject,
      id: newBikeId,
    };
    const userRef = Users.doc(req.user.uid);
    const query = Bikes.where('serial', '==', bikeRequestObject.serial).get()
      .then(snapshot => {
        if (!snapshot.empty) {
          res.status(409).json({
            message: `Bike already registered`,
          });
        } else {
          userRef.get()
            .then(async snapshot => {
              if (snapshot.exists) {
                const bikes = snapshot.data().bikes || [];
      
                const filteredBikes = bikes.filter(bike => bike.serial === bikeRequestObject.serial);
      
                if (filteredBikes.length) {
                  res.status(409).json({
                    message: 'Bike already exists in user profile',
                  });
                } else {
                  Bikes.doc(newBikeId).set(bikeObject).then(ref => {
                    bikes.push(newBikeId);
                    
                    userRef.update({
                      bikes,
                    }).then(updateResponse => {
                      console.log(`CREATED_BIKE ${JSON.stringify(bikeObject)}`);
                      res.json(bikeObject);
                    }).catch(updateError => {
                      console.error(updateError);
                      res.status(500).json({
                        message: 'An error occurred while updating the user with then new bike information',
                      });
                    });
                  }).catch((error) => {
                    console.error(error);
                    res.status(500).json({
                      message: 'An error occurred while saving the new bike information',
                    });
                  });
                }
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
  

  }

}
