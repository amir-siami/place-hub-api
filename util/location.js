const axios = require("axios");
const HttpError = require("../models/http-error");
const openCageApiKey = process.env.OPENCAGE_API_KEY;

const geocodeAddress = async (address) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${openCageApiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return {
        lat: lat,
        lng: lng,
      };
    } else {
      throw new HttpError("No results found", 422);
    }
  } catch (error) {
    throw new HttpError(`Geocoding failed: ${error.message}`);
  }
};

module.exports = geocodeAddress;
