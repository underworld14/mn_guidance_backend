import multer from "multer";
import HttpException from "./HttpException";

class Storage {
  // photoStorage = multer.diskStorage({
  //   destination: function(req, file, cb) {
  //     cb(null, "public/img");
  //   },
  //   filename: function(req, file, cb) {
  //     const ext = file.mimetype.split("/")[1];
  //     const uniqueName = `user-${req.user.id}-${Date.now()}.${ext}`;
  //     cb(null, uniqueName);
  //   }
  // });

  static uploadImg = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (req.file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(new HttpException("not an image file !", 400));
      }
    }
  }).single("photo");
}

export default Storage;
