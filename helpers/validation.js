const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorsCustom = [];
  errors.array().map((err) => errorsCustom.push({ [err.param]: err.msg }));
  // return helper.apiResponse(res, errorsCustom, true, null, "FORBIDDEN");
  return res.status(400).send({ message: "FORBIDDEN", data: errorsCustom });
};
