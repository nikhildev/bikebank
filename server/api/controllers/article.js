const pool = require('../helpers/db').getPool();

module.exports = {
  article
};

function article(req, res) {
  if (req.swagger.params.articleId && req.swagger.params.articleId.value) {
    const query = `
      SELECT
        Articles.ID,
        Articles.Title,
        Articles.Slug,
        Articles.Image,
        Articles.Date,
        Articles.Category,
        Articles.CuratedCategoryID,
        Articles.Content,
        Articles.Url AS SourceUrl,
        Articles.NewspaperID,
        Newspapers.Name AS NewspaperName,
        Newspapers.Slug AS NewspaperSlug,
        CuratedCategories.Name AS CuratedCategoryName,
        CuratedCategories.Slug AS CuratedCategorySlug
      FROM Articles
      INNER JOIN CuratedCategories
        ON CuratedCategories.ID = Articles.CuratedCategoryID
      INNER JOIN Newspapers
        ON Newspapers.ID = Articles.NewspaperID
      WHERE Articles.ID = ${req.swagger.params.articleId.value}
      LIMIT 1;
    `;


    pool.query(query, (err, data) => {
      console.log(query);

      if (err) {
        console.error(err.error);
        res.status(500).json({error: 'Internal Server Error'});
      }

      if (data.length) {
        res.json(data[0]);
      } else {
        res.status(404).json({
          message: 'Article not found'
        })
      }

    });
  } else {
    res.status(400).json({message: 'Missing or Invalid article id'});
  }

}