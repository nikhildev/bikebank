module.exports = {
  protected
};

function protected(req, res) {
  console.log('/protected -> SUCCESS');
  res.json({user: req.user});
}
