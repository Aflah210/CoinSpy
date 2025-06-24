const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coinId: { type: String, required: true }, // CoinGecko coin id
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  image: { type: String },
  current_price: { type: Number },
  market_cap_rank: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema); 