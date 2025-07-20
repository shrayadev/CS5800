const {
  filterByMaxRent,
  findNearbyListings,
  filterByRoomType,
  filterByAmenities,
  _setListings
} = require('../backend/controllers/listingsController');

const sampleListings = [
  {
    id: 1,
    rent: 900,
    distance: 0.8,
    roomType: "Private",
    amenities: ["WiFi", "Laundry"]
  },
  {
    id: 2,
    rent: 1200,
    distance: 3.0,
    roomType: "Studio",
    amenities: ["AC", "Parking"]
  },
  {
    id: 3,
    rent: 800,
    distance: 1.5,
    roomType: "Shared",
    amenities: ["WiFi", "Parking"]
  }
];

beforeEach(() => {
  _setListings(sampleListings);
});

describe('filterByMaxRent()', () => {
  test('returns listings under or equal to max rent', () => {
    const result = filterByMaxRent(1000);
    expect(result).toEqual([
      sampleListings[0],
      sampleListings[2]
    ]);
  });

  test('returns empty array if no listings qualify', () => {
    const result = filterByMaxRent(500);
    expect(result).toEqual([]);
  });
});

describe('findNearbyListings()', () => {
  test('returns listings within max distance', () => {
    const result = findNearbyListings(2.0);
    expect(result).toEqual([
      sampleListings[0],
      sampleListings[2]
    ]);
  });

  test('returns empty array if all listings are too far', () => {
    const result = findNearbyListings(0.1);
    expect(result).toEqual([]);
  });
});

describe('filterByRoomType()', () => {
  test('returns listings matching the room type', () => {
    const result = filterByRoomType("Private");
    expect(result).toEqual([sampleListings[0]]);
  });
});

describe('filterByAmenities()', () => {
  test('returns listings that include all required amenities', () => {
    const result = filterByAmenities(["WiFi", "Parking"]);
    expect(result).toEqual([sampleListings[2]]);
  });

  test('returns empty array if no listings include all required amenities', () => {
    const result = filterByAmenities(["Gym", "AC"]);
    expect(result).toEqual([]);
  });
});