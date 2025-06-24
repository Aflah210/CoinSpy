📖 About the Project
CoinSpy is a full-stack cryptocurrency tracker built with the MERN stack (MongoDB, Express, React, Node.js). It leverages the CoinGecko API to fetch real-time data on cryptocurrencies and allows users to save their favorite coins for quick access.

Perfect for crypto enthusiasts who want a fast and elegant way to monitor live market prices, ranks, and trends.

🚀 Features
📊 Live Cryptocurrency Prices
Real-time data on top coins using CoinGecko API.

❤️ Favorite Coins Manager
Save and manage your personal favorite cryptocurrencies in MongoDB.

🔍 Search & Filter
Quickly find specific coins by name or symbol.

📈 Market Cap Sorting
Display top 10/50/100 coins by market cap.

🧾 RESTful API
Backend endpoints to store, fetch, and delete favorite coins.

⚙️ Functionality
🌐 Frontend (React)
Displays a list of top cryptocurrencies with:

Name

Symbol

Current price (USD)

Market rank

24h % change

Coin logo

"Add to Favorites" and "Remove from Favorites" functionality

Favorites view powered by MongoDB via Express API

🛠 Backend (Express + MongoDB)
API Endpoints:

GET /api/favorites → Get saved favorite coins

POST /api/favorites → Add a coin to favorites

DELETE /api/favorites/:id → Remove a coin by ID

🛠 Tech Stack
Frontend: React.js, Axios, TailwindCSS (optional)

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

API: CoinGecko (no API key required)

🧪 Future Improvements
🔐 User authentication (so each user has unique favorites)

🧭 Currency switcher (USD/EUR/INR)

📊 Sparkline or chart for coin price history

📱 Mobile responsive layout

📨 Email alerts for price drops

🧙 Author
Made with 💚 by [Aflah Haami]
Inspired by the chaotic joy of watching crypto moon and crash.

