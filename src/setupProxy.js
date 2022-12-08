const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://os-ml10.eng.marklogic.com:8005',
      changeOrigin: true,
    })
  );
};