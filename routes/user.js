const router = require('express').Router(),
  expressListRoutes = require('express-list-routes');
const userCtrl = require('../controllers/user');

module.exports = () => {
  router.get('', userCtrl.getAllUsers);
  router.get('/:userId', userCtrl.getUser);
  router.get('/:userId/avatar', userCtrl.getUserAvatar);
  router.delete('/:userId/avatar', userCtrl.deleteUserAvatar);

  expressListRoutes({prefix: '/api/user'}, 'API:', router);
  return router;
}
