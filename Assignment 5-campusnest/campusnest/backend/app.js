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

// ✅ CORS fix: explicitly allow your deployed frontend origin
app.use(cors({
  origin: 'https://campusnest-lod6.onrender.com' // replace with your actual frontend domain if different
}));

app.use(express.json());

// Optional: serve frontend if colocated
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check route
app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});

// GET /api/listings with optional filters
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
