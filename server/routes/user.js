const express = require('express');
const { getAllUsers, insertUser } = require('../db/user');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAllUsers();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await insertUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
