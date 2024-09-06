const express = require('express');
const router = new express.Router();
const artistController = require('../controllers/artistController');

// GET /api/artists?artistName=:artistName
router.get('/', async (req, res, next) => {
  try {
    const artistName = req.query.artistName;
    if (!artistName) {
      return res.status(400).json({ error: 'artistName query parameter is required' });
    }
    const artistData = await artistController.getArtistData(artistName);
    return res.json(artistData);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;