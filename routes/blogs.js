const express = require('express');
const router = express.Router();
const blogs = require('../services/blogs');

/* GET blogs. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await blogs.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting blogs `, err.message);
    next(err);
  }
});

/* POST blogs */
router.post('/', async function(req, res, next) {
    try {
      res.json(await blogs.create(req.body));
    } catch (err) {
      console.error(`Error while creating blog`, err.message);
      next(err);
    }
  });

/* PUT blog */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await blogs.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating blog`, err.message);
      next(err);
    }
  });

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await blogs.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting blog`, err.message);
      next(err);
    }
  });

module.exports = router;