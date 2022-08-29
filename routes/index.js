const router = require('express').Router();
const { rmSync } = require('fs');
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

module.exports = router;