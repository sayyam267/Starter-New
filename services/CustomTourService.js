const CustomTour = require("../models/CustomTour");

module.exports = {
  requestCustomTour: async (data) => {
    let newrequest = await CustomTour({ ...data });
    await newrequest.save();
  },
};
