module.exports = {
  protected
};

function protected(req, res) {
  res.json({user: req.user});
}
