const express = require('express');

const rawMaterial = require('./rawMaterial');
const material = require('./material');

const router = express.Router();

router.use('/rawMaterial', rawMaterial);
router.use('/material', material);

module.exports = router;
