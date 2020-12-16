// get the shortest distance b/w two coordintes
function calculateDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// get the asc of the distances of the pumps
const ascPumps = ({ allPumps = [], lat, lon }) => {
  const ascDistances = allPumps
    .map((l) => {
      const { latitude, longitude } = l;
      const distance = calculateDistance(lat, lon, latitude, longitude);
      return { ...l, distance };
    })
    .sort((a, b) => a.distance - b.distance);

  return ascDistances;
};

module.exports = ascPumps;
