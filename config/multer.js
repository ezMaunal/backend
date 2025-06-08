import env from "./env.js";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3.js";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      const filename = `manuals/${uuidv4()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

export default upload;
