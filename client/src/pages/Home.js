import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { token, user } = useContext(AuthContext);

  // Fetch coins
  useEffect(() => {
    async function fetchCoins() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 20,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        setError('Failed to fetch coins.');
      }
      setLoading(false);
    }
    fetchCoins();
  }, []);

  // Fetch favorites if logged in
  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }
    async function fetchFavorites() {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        setFavorites([]);
      }
    }
    fetchFavorites();
  }, [token]);

  const isFavorited = (coinId) => favorites.some((fav) => fav.coinId === coinId);
  const getFavoriteId = (coinId) => {
    const fav = favorites.find((f) => f.coinId === coinId);
    return fav ? fav._id : null;
  };

  const handleAddFavorite = async (coin) => {
    if (!token) return;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/favorites',
        {
          coinId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          current_price: coin.current_price,
          market_cap_rank: coin.market_cap_rank,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites([...favorites, res.data]);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to add favorite.');
    }
  };

  const handleRemoveFavorite = async (coinId) => {
    if (!token) return;
    const favId = getFavoriteId(coinId);
    if (!favId) return;
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${favId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favorites.filter((f) => f.coinId !== coinId));
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to remove favorite.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Top Cryptocurrencies</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Market Rank</th>
            <th>24h % Change</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} style={{ borderBottom: '1px solid #eee' }}>
              <td><img src={coin.image} alt={coin.name} width={32} height={32} /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>{coin.market_cap_rank}</td>
              <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td>
                {user ? (
                  isFavorited(coin.id) ? (
                    <button onClick={() => handleRemoveFavorite(coin.id)} style={{ color: 'red' }}>
                      Remove from Favorites
                    </button>
                  ) : (
                    <button onClick={() => handleAddFavorite(coin)}>
                      Add to Favorites
                    </button>
                  )
                ) : (
                  <span style={{ color: '#888' }}>Login to favorite</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home; 