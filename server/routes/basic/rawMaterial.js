const express = require('express');
const {
  getRawMaterialList,
  insertRawMaterial,
  editRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
} = require('../../db/basic/rawMaterial');

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const result = await getRawMaterialList();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/insert', async (req, res) => {
  try {
    const result = await insertRawMaterial(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.get('/edit', async (req, res) => {
  try {
    const result = await editRawMaterial(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/update', async (req, res) => {
  try {
    const result = await updateRawMaterial(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

router.post('/delete', async (req, res) => {
  try {
    const result = await deleteRawMaterial(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
