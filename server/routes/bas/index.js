const express = require('express');

const rawMat = require('./rawMat');
const mat = require('./mat');

const router = express.Router();

router.use('/rawMat', rawMat);
router.use('/mat', mat);

module.exports = router;
