const express = require('express');
const { filterByMaxRent, findNearbyListings } = require('./controllers/listingsController');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
