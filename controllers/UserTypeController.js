const UserTypeService = require("../services/UserTypeService");

module.exports = {
  create: async (req, res) => {
    try {
      let type = await UserTypeService.create(req.body);
      return res.status(200).send({ data: type, message: "Created" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getTypes: async (req, res) => {
    try {
      let types = await UserTypeService.getTypes();
      return res.status(200).send({ data: types, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getTypeByID: async (req, res) => {
    try {
      let type = await UserTypeService.getTypeById(req.params.id);
      return res.status(200).send({ data: type, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
