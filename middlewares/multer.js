const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./public/images/tourpics"));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(".jpg")[0];
    cb(null, Date.now() + " - " + filename + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const multerImages = (req, res, next) => {
  if (!req.body?.multiImages) {
    return res
      .status(401)
      .send({ message: "Please Provide Images for tour", data: null });
  } else {
    upload.fields([{ name: "multiImages", maxCount: 5 }]);
    next();
  }
};
module.exports = multerImages;
