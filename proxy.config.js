const proxy = [
    {
      context: '/api',
      target: 'https://ucardapi.herokuapp.com',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;