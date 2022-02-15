const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    error: err.message || 'Internal server error.',
    stack: err.stack
  })
});

router.use((req, res) => {
  res.status(404).send("<h1>Route not found!</h1>")
});

module.exports = router;