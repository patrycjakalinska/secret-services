const cloudinary = require('cloudinary').v2
const Multer = require('multer')
const config = require('./config')

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
})

const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, { resource_type: 'auto' })
  return res
}

const storage = new Multer.memoryStorage()
const upload = Multer({ storage })

module.exports = {
  upload,
  cloudinary,
  storage,
  handleUpload
}
