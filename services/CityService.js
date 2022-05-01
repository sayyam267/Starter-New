const CityModel = require("../models/Cities");

module.exports = {
  addCity: async (data) => {
    try {
      let cityname = data;
      let city = await new CityModel({ name: cityname });
      await city.save();
      return city;
    } catch (e) {
      throw e;
    }
  },
  getCities: async () => {
    try {
      let cities = await CityModel.find({});
      if (Object.keys(cities).length > 0) {
        return cities;
      } else {
        let e = new Error();
        e.message = "No Cities Were Found";
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  getCityByID: async (data) => {
    try {
      let city = await CityModel.findById(data);
      if (city) {
        return city;
      } else {
        let e = new Error();
        e.message = "Not Found";
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
};
