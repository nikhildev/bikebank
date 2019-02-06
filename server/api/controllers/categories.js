module.exports = {
  categories
};

function categories(req, res) {
  const query = `
    SELECT DISTINCT(curated_categories.id) AS id,
    curated_categories.name,
    curated_categories.slug
    FROM curated_categories
      INNER JOIN articles
      ON articles.curated_category_id = curated_categories.id
  ;`;

  console.log(query);


  global.client.query(query, (err, data) => {
    if (data.rows.length) {
      res.json(data.rows)
    }

    if (err) {
      console.error(err.error);
      res.status(500).json({error: 'Internal Server Error'})
    }
  });
}