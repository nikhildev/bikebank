const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const helmet = require('helmet')
const app = require('express')();
const apiKeyAuth = require('./api/helpers/security').apiKeyAuth;
const accessTokenAuth = require('./api/helpers/security').accessTokenAuth;

const config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    APIKeyHeader: apiKeyAuth,
    AccessTokenHeader: accessTokenAuth,
  },
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  const port = process.env.PORT || 10010;

  swaggerExpress.register(app);
  app.use(helmet());
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  console.log(`Listening on port ${port}`)
  app.listen(port);
});

module.exports = app; // for testing