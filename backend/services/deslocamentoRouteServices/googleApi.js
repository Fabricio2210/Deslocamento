const googleMapsClient = require("@google/maps").createClient({
    key: `${process.env.GOOGLE_KEY}`,
  });

  const googleMapsApi = (googleMapsObject,cb) =>{
    return googleMapsClient.directions(googleMapsObject,cb)
  }

  module.exports = googleMapsApi