module.exports = {
    port: process.env.PORT || 3000,
    realm: process.env.REALM || 'http://localhost:3000/',
  secretkey: 'userSecretKey',
  refreshTokenSecret: 'userSecretRefreshTokenKey',
  tokenLife: Math.floor(Date.now() / 1000) + (60 * 60),
}
