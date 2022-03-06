const authVendor = (req, res, next) => {
  if (req.user.role != "vendor" || req.user.role != "tourguide") {
    // console.log("NOT AUTHORIZED");
    return res.status(401).send("You are not allowed to do that!");
  }
  next();
};
module.exports = authVendor;
