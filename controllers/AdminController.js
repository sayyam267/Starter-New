const AdminService = require("../services/AdminService");

module.exports = {
  blockUser: async (req, res) => {
    try {
      let blocked = await AdminService.blockUser(req.body.userID);
      return res
        .status(200)
        .send({ data: true, message: "User Blocked Successfully" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  createAdmins: async (req, res) => {
    try {
      let newAdmin = await AdminService.createAdmins(req.body);
      return res.status(200).send({ data: true, message: "Created Admin" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      let deleteduser = await AdminService.deleteUser(req.body.userID);
      return res.status(200).send({ data: true, message: "Deleted User" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  acceptVendorRequest: async (req, res) => {
    try {
      let request = await AdminService.acceptVendorRequest(req.body.vendorID);
      return res.status(200).send({ data: request, message: "Accepted" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getPendingVendorRequests: async (req, res) => {
    try {
      let requests = await AdminService.getpendingVendorsRequests();
      return res.send({ data: requests, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.status || 400)
        .send({ data: null, message: e.message });
    }
  },
  getDashBoard: async (req, res) => {
    try {
      let dashboard = {};
      let pendingVendorRequests =
        await AdminService.getpendingVendorsRequests();
      let;
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
