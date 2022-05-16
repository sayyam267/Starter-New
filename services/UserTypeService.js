const UserTypeModel = require("../models/UserType");

module.exports = {
  create: async (data) => {
    if (!data?.userType) {
      let e = new Error();
      e.message = "userType attr missing";
      e.statusCode = 400;
      throw e;
    }
    let newType = await new UserTypeModel({ userType: data?.userType });
    await newType.save();
    return newType;
  },
  getTypes: async () => {
    let types = await UserTypeModel.find({});
    if (types) return types;
    else {
      let e = new Error();
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getTypeById: async (id) => {
    let type = await UserTypeModel.findById(id);
    // console.log(type);
    if (!type) {
      let e = new Error();
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
    return type;
  },
};
