const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const Multer = require('multer')
const config = require('./config')
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
})

const handleUpload = async (file) => {
  try {
    const filename = `temp-${Date.now()}`

    await writeFile(filename, file)

    const res = await cloudinary.uploader.upload(filename, {
      resource_type: 'auto',
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

const storage = new Multer.memoryStorage()
const upload = Multer({ storage })

module.exports = {
  upload,
  cloudinary,
  storage,
  handleUpload,
}
