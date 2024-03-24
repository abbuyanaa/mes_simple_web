const express = require('express');
const {
  getMatList,
  matInsert,
  matDetail,
  matUpdate,
  matDelete,
} = require('../../db/bas/mat');

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const result = await getMatList();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/insert', async (req, res) => {
  try {
    const result = await matInsert(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.get('/detail', async (req, res) => {
  try {
    const result = await matDetail(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/update', async (req, res) => {
  try {
    const result = await matUpdate(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/delete', async (req, res) => {
  try {
    const result = await matDelete(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
