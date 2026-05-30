const fs = require("fs");
const path = require("path");
const multer = require("multer");
const HttpError = require("../helpers/HttpError");

const tempDir = path.join(process.cwd(), "temp");
fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(HttpError(400, "Only image files are allowed"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
