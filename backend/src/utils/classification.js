const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient({
  keyFilename: './src/utils/googleAPIKey.json',
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
