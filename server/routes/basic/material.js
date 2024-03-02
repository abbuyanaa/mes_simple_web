const express = require('express');
const {
  getMaterialList,
  insertMaterial,
  editMaterial,
  updateMaterial,
  deleteMaterial,
} = require('../../db/basic/material');

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const result = await getMaterialList();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/insert', async (req, res) => {
  try {
    const result = await insertMaterial(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.get('/edit', async (req, res) => {
  try {
    const result = await editMaterial(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/update', async (req, res) => {
  try {
    const result = await updateMaterial(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/delete', async (req, res) => {
  try {
    const result = await deleteMaterial(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
