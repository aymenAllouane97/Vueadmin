let publicPath = process.env.NODE_ENV === 'production' ? './' : './';

module.exports = {
  publicPath,
  productionSourceMap: false,
  devServer: {
    proxy: 'https://localhost:4002'
  }
};
