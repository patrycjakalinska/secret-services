const tf = require('@tensorflow/tfjs-node')
require('@tensorflow/tfjs-node')
const mobilenet = require('@tensorflow-models/mobilenet')

const classifyImage = async (imageData) => {
  const model = await mobilenet.load()

  const image = await tf.node.decodeImage(imageData)
  const predictions = await model.classify(image)

  if (predictions[0].probability < 0.5) {
    return [predictions[0].className, predictions[1].className]
  }
  return [predictions[0].className]
}

module.exports = {
  classifyImage,
}
