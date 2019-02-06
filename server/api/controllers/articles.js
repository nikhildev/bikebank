const moment = require('moment-timezone');
const errors = require('../helpers/errors');
const pool = require('../helpers/db').getPool();

module.exports = {
  articles
};

function articles(req, res) {
  // We construct WHERE clauses in string push to an array for concatenation later
  const conditions = [];

  if (req.swagger.params.newspaperId && req.swagger.params.newspaperId.value) {
    conditions.push(`newspapers.id=${req.swagger.params.newspaperId.value}`);
  }

  let dateInIST = moment().format('YYYY-MM-DD');
  if (req.swagger.params.date && req.swagger.params.date.value) {
    dateInIST = moment(req.swagger.params.date.value).format('YYYY-MM-DD');
  }
  conditions.push(`Articles.Date='${dateInIST}'`);

  if (req.swagger.params.categoryId && req.swagger.params.categoryId.value) {
    conditions.push(`category.id=${req.swagger.params.categoryId.value}`);
  }

  const limitClause = req.swagger.params.limit && req.swagger.params.limit.value
      ? ` LIMIT ${req.swagger.params.limit.value} `
      : ' LIMIT 50 ';

  const orderClause = req.swagger.params.desc && req.swagger.params.desc.value
      ? ' ORDER BY Date DESC '
      : ' ORDER BY Date ASC ';

  const query = `
    SELECT
      DISTINCT(Articles.ID) as ID,
      Articles.NewspaperID,
      Articles.Title,
      Articles.Date,
      Articles.Category,
      Articles.CuratedCategoryID,
      Articles.Image,
      Articles.Url AS SourceUrl,
      Articles.Slug,
      SUBSTRING(Articles.Content, 1, 150) AS Content,
      Newspapers.Name AS NewspaperName,
      Newspapers.Slug AS NewspaperSlug,
      CuratedCategories.Name AS CuratedCategoryName,
      CuratedCategories.Slug AS CuratedCategorySlug
    FROM Articles
    INNER JOIN CuratedCategories
      ON CuratedCategories.ID = Articles.CuratedCategoryID
    INNER JOIN Newspapers
      ON Newspapers.ID = Articles.NewspaperID
    WHERE
      ${conditions.join('AND')}
    ${orderClause}
    ${limitClause}
  `;

  console.log(query);

  pool.query(query, (err, data) => {
    if (err) {
      console.error(errors.DB[err.code]);
      res.status(500).json({error: 'Internal Server Error'});
    } else if (data && data.length) {
      res.json(data)
    } else {
      res.json({
        message: 'No articles found'
      });
    }

  });


}