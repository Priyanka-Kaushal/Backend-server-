
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure the "Images" directory exists
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "Images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `imageLion-${Date.now()}${path.extname(file.originalname)}`);
  },
});

console.log("storage:", storage);
// Initialize multer with the storage engine
const upload = multer({ storage });
console.log("uploadingggg:", upload);

module.exports = upload; // ✅ Ensure `upload` is exported correctly
