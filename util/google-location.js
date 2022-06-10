const axios = require("axios");
const API_KEY = "AIzaSyA2tO8_zM8o-1DHhIQtZV6-44_TZeDtt_E";
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?language=ko&address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status == "ZERO_RESULTS") {
        throw new HttpError(
            "Could not find location for the specified address.",
            422
        );
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

module.exports = getCoordsForAddress;