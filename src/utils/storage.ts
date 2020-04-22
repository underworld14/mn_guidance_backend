import multer from "multer";
import HttpException from "./HttpException";

export const uploadImg = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new HttpException("not an image file !", 400));
    }
  },
}).single("photo");
