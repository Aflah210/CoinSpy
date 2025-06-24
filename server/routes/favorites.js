const router = require('express').Router();
const Favorite = require('../models/favorite.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware to check JWT and set req.userId
function auth(req, res, next) {
  const token = req.header('x-auth-token') || req.header('authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// GET /api/favorites - get all favorites for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/favorites - add a favorite
router.post('/', auth, async (req, res) => {
  try {
    const { coinId, name, symbol, image, current_price, market_cap_rank } = req.body;
    // Prevent duplicates
    const exists = await Favorite.findOne({ user: req.userId, coinId });
    if (exists) return res.status(400).json({ msg: 'Coin already in favorites' });
    const favorite = new Favorite({
      user: req.userId,
      coinId,
      name,
      symbol,
      image,
      current_price,
      market_cap_rank,
    });
    const saved = await favorite.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/favorites/:id - remove a favorite by its _id
router.delete('/:id', auth, async (req, res) => {
  try {
    const fav = await Favorite.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!fav) return res.status(404).json({ msg: 'Favorite not found' });
    res.json({ msg: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 