const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient({
  keyFilename: './src/utils/googleAPIKey.json',
})

const classifyImage = async (fileBuffer) => {
  const [result] = await client.labelDetection(fileBuffer)
  const labels = result.labelAnnotations
  return [
    labels[0].description,
    labels[1].description,
    labels[2].description,
  ]
}

module.exports = {
  classifyImage,
}
