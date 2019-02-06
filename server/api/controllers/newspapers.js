const pool = require('../helpers/db').getPool();
const errors = require('../helpers/errors');

module.exports = {
  newspapers
};

function newspapers(req, res) {
  const limitClause = req.swagger.params.limit.value
      ? ` LIMIT ${req.swagger.params.limit.value} `
      : ' LIMIT 50 ';

  const orderClause = req.swagger.params.desc.value
      ? ' ORDER BY Name DESC '
      : ' ORDER BY Name ASC ';

  const query = `
    SELECT
      *
    FROM
      Newspapers
    ${orderClause}
    ${limitClause}
  ;`;

  pool.query(query, (err, data) => {
    if (err) {
      console.error(errors.DB[err.code]);
      res.status(500).json({error: 'Internal Server Error'});
    } else if (data && data.length) {
      res.json(data);
    } else {
      res.json({
        code: 404,
        message: 'No newspapers found'
      });
    }
  });
}
