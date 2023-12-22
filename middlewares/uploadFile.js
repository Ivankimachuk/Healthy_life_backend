const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars');
    },
filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const name = `${basename}-${uniqueSuffix}${extname}`;
        cb(null, name);
    }
});

const upload = multer({ storage });

const types = [
  { name: "name" },
  { name: "gender" },
  { name: "age" },
  { name: "height" },
  { name: "weight" },
  { name: "activityLevel" },
  { name: "avatar", maxCount: 1 },
];

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File is not a picture'), false);
  }
};

module.exports = { upload, types, fileFilter };