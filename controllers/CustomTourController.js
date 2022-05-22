const CustomTour = require("../services/CustomTourService");

module.exports = {
  requestCustomTour: async (req, res) => {
    try {
      let newTourRequest = await CustomTour.requestCustomTour(req.body);
      return res.send({ data: newTourRequest, message: "Request Created" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
