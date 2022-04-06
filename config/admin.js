module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3065494337a90da5e7db8d40a2eacc72'),
  },
});
