const Pump = require("../../models/Pump");
const ascPumps = require("../../utils/getAscPumps");
const response = require("../../utils/response");

const getLocations = async (req, res) => {
  const { latitude, longitude } = req.body;
  const allPumps = await Pump.find().lean(); // get all the pumps

  // manipulate the pumps a/c to their shortest distance to the user
  try {
    const pumpsWithShortestPath = ascPumps({
      allPumps,
      lat: latitude,
      lon: longitude,
    });
    return response.success(res, { pumps: pumpsWithShortestPath });
  } catch (err) {
    return response.error(res, []);
  }
};

module.exports = getLocations;
