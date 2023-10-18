const cloudinary = require('cloudinary').v2
const multer = require('multer')
const config = require('./config')

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET,
})

const handleUpload = async (file, folder) => {
  try {
    const res = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${file}`,
      { folder: `detectiveApp/${folder}` }
    )
    return res
  } catch (err) {
    console.log(err)
  }
}

const handleDeleteCase = async (file, folderName) => {
  try {
    const res = await cloudinary.uploader.destroy(file)
    const folder = await cloudinary.api.delete_folder(
      `detectiveApp/cases/${folderName}`
    )
    return res
  } catch (err) {
    console.log(err)
  }
}

const handleDeleteOnePhoto = async (file) => {
  try {
    const res = await cloudinary.uploader.destroy(file)
    return res
  } catch (err) {
    console.log(err)
  }
}

const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = {
  upload,
  handleUpload,
  handleDeleteCase,
  handleDeleteOnePhoto,
}
