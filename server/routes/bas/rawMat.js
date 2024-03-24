const express = require('express');
const {
  getRawMatList,
  rawMatInsert,
  rawMatDetail,
  rawMatUpdate,
  rawMatDelete,
} = require('../../db/bas/rawMat');
const dbMessage = require('../../messages/db.json');

const router = express.Router();

router.get('/list', async (req, res, next) => {
  try {
    const result = await getRawMatList();
    if (!result) return res.status(500).send(dbMessage[req.locale.toString()].databaseError);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post('/insert', async (req, res, next) => {
  try {
    const result = await rawMatInsert(req.body);
    if (!result) return res.status(500).send(dbMessage[req.locale.toString()].databaseError);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.get('/detail', async (req, res, next) => {
  try {
    const result = await rawMatDetail(req.query);
    if (!result) return res.status(500).send(dbMessage[req.locale.toString()].databaseError);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post('/update', async (req, res, next) => {
  try {
    const result = await rawMatUpdate(req.body);
    if (!result) return res.status(500).send(dbMessage[req.locale.toString()].databaseError);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const result = await rawMatDelete(req.body);
    if (!result) return res.status(500).send(dbMessage[req.locale.toString()].databaseError);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
