const express = require('express');
const cors = require('cors');
const path = require('path');

const {
  getAllListings,
  filterByMaxRent,
  filterByRoomType,
  findNearbyListings,
  filterByAmenities,
  addListing 
} = require('./controllers/listingsController');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*'
}));

app.use(express.json());

// Optional: serve static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check route
app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});


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


app.post('/api/listings', (req, res) => {
  const newListing = req.body;

  // Basic validation
  if (!newListing || !newListing.title || !newListing.rent) {
    return res.status(400).json({ error: 'Missing listing data' });
  }

  const added = addListing(newListing);
  res.status(201).json(added);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

