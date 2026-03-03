const mongoose = require('mongoose')
const debug = require('debug')("development:mongoose")

const connectedTODb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    debug('database Connected Successfully')
  } catch (err) {
    debug('Error in Database Connection :', err.message)
    process.exit(1)
  }
}



module.exports = connectedTODb