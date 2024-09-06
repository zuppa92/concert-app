require("dotenv").config();

const PORT = process.env.PORT || 3001;

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "my_secure_secret_key",
  PORT: +process.env.PORT || 3001,
  BCRYPT_WORK_FACTOR: +process.env.BCRYPT_WORK_FACTOR || 12,
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://localhost:5432/concert",
  LASTFM_API_KEY: process.env.LASTFM_API_KEY,
};
