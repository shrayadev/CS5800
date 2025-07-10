const {
  filterByMaxRent,
  findNearbyListings
} = require('../backend/controllers/listingsController');

describe('filterByMaxRent()', () => {
  const listings = [
    { id: 1, rent: 900 },
    { id: 2, rent: 1200 },
    { id: 3, rent: 800 }
  ];

  test('returns listings under or equal to max rent', () => {
    const result = filterByMaxRent(listings, 1000);
    expect(result).toEqual([
      { id: 1, rent: 900 },
      { id: 3, rent: 800 }
    ]);
  });

  test('returns empty array if no listings qualify', () => {
    const result = filterByMaxRent(listings, 500);
    expect(result).toEqual([]);
  });
});

describe('findNearbyListings()', () => {
  const listings = [
    { id: 1, distance: 1.2 },
    { id: 2, distance: 3.0 },
    { id: 3, distance: 0.5 }
  ];

  test('returns listings within max distance', () => {
    const result = findNearbyListings(listings, 2.0);
    expect(result).toEqual([
      { id: 1, distance: 1.2 },
      { id: 3, distance: 0.5 }
    ]);
  });

  test('returns empty array if all listings are too far', () => {
    const result = findNearbyListings(listings, 0.1);
    expect(result).toEqual([]);
  });
});
