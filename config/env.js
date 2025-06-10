import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 8000,

  MONGODB_URL: process.env.MONGODB_URL,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,

  JWT_SECRET: process.env.JWT_SECRET,

  KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
};
