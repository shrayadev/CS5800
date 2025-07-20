const express = require('express');
const cors = require('cors');
const path = require('path');

const {
  getAllListings,
  filterByMaxRent,
  filterByRoomType,
  findNearbyListings,
  filterByAmenities
} = require('./controllers/listingsController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});

// Get all listings
app.get('/api/listings', (req, res) => {
  let results = getAllListings();

  const { maxRent, roomType, maxDistance, amenities } = req.query;

  if (maxRent) results = filterByMaxRent(parseInt(maxRent));
  if (roomType) results = filterByRoomType(roomType);
  if (maxDistance) results = findNearbyListings(parseFloat(maxDistance));
  if (amenities) {
    const amenitiesList = amenities.split(',').map(a => a.trim());
    results = filterByAmenities(amenitiesList);
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});