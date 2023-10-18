const tf = require('@tensorflow/tfjs-node')
require('@tensorflow/tfjs-node')
const mobilenet = require('@tensorflow-models/mobilenet')

const classifyImage = async (imagePath) => {
  const model = await mobilenet.load()

  const image = await tf.node.decodeImage(
    tf.node.encodeJpeg(tf.node.readFileSync(imagePath))
  )

  const predictions = await model.classify(image)

  predictions.forEach((prediction) => {
    console.log(
      `Class: ${prediction.className}, Probability: ${prediction.probability}`
    )
  })
}

module.exports = {
  classifyImage,
}
