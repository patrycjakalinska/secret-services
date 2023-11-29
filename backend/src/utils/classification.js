const vision = require('@google-cloud/vision')
const config = require('./config')

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: config.GOOGLE_CLIENT_EMAIL,
    private_key: config.GOOGLE_PRIVATE_KEY,
  },
})

const classifyImage = async (fileBuffer) => {
  const [result] = await client.labelDetection(fileBuffer)
  const labels = result.labelAnnotations
  const tags = []
  for (let label of labels) {
    tags.push(label.description)
  }
  return tags
}

module.exports = {
  classifyImage,
}
