const request = require("request");

const geocode = (country, callback) => {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(country) + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw";

    request({ url: geocodeurl, json: true }, (error, response) => {
        if (error) {
            callback("Can't connect to location services!", undefined);
        } else if (response.body.message) {
            callback("Error from geocoding service: " + response.body.message, undefined);
        } else if (response.body.features.length === 0) {
            callback("Invalid country name or address. Please try again.", undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
