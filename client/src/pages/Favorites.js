import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    async function fetchFavorites() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        setError('Failed to fetch favorites.');
      }
      setLoading(false);
    }
    fetchFavorites();
  }, [token, navigate]);

  const handleRemoveFavorite = async (favId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${favId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favorites.filter((f) => f._id !== favId));
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to remove favorite.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container">
      <h1>Your Favorite Coins</h1>
      {favorites.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Market Rank</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((coin) => (
              <tr key={coin._id} style={{ borderBottom: '1px solid #eee' }}>
                <td><img src={coin.image} alt={coin.name} width={32} height={32} /></td>
                <td>{coin.name}</td>
                <td>{coin.symbol.toUpperCase()}</td>
                <td>${coin.current_price?.toLocaleString()}</td>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <button onClick={() => handleRemoveFavorite(coin._id)} style={{ color: 'red' }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Favorites; 