import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
                <button>Add to Favorites</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home; 