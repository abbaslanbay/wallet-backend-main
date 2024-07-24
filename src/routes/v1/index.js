const express = require('express');
const docsRoute = require('./docs.route');

const router = express.Router();
const authRoute = require('./user.auth.route');
const userRoute = require('./user.route');
const walletRoute = require('./wallet.route');

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

const userRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/wallet',
    route: walletRoute,
  },
];

userRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === 'UAT') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
