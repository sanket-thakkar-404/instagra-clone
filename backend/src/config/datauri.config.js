const DataUriParser = require('datauri/parser')
const parser = new DataUriParser()
const path = require('path')

const getDataUri = (file) => {
  const extName = path.extname(file.originalname).toString()

  const result = parser.format(extName, file.buffer)
  return result.content
}

module.exports = getDataUri