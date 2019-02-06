const performace = require('perf_hooks').performance;

module.exports = {
  ping
};

function ping(req, res) {
  console.log(`Pinged at ${performace.now()}`);
  res.json('pong');
}
