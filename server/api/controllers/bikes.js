const performace = require('perf_hooks').performance;
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

const uuid = require('uuid/v4');

module.exports = {
  createBike
};

function createBike(req, res) {
  const bikeObject = {
    id: uuid(),
  }
  const newBikeId = uuid();
  console.log(`CREATE_BIKE: ${JSON.stringify(bikeObject)}`);
  res.json(bikeObject);
}
