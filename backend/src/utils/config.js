require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const SECRET = process.env.SECRET
const CLOUD_KEY = process.env.CLOUD_KEY
const CLOUD_SECRET = process.env.CLOUD_SECRET
const CLOUD_NAME = process.env.CLOUD_NAME
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

module.exports = {
  CLOUD_KEY,
  CLOUD_NAME,
  CLOUD_SECRET,
  MONGODB_URI,
  PORT,
  SECRET,
}
