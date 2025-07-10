function filterByMaxRent(listings, maxRent) {
  return listings.filter(listing => listing.rent <= maxRent);
}

function findNearbyListings(listings, maxDistance) {
  return listings.filter(listing => listing.distance <= maxDistance);
}

module.exports = { filterByMaxRent, findNearbyListings };
