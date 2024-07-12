import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET ,
  access_token_expires_in : process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expires_in : process.env.REFRESH_TOKEN_EXPIRES_IN


};